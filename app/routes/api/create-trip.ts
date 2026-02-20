import OpenAI from "openai";
import type { ActionFunctionArgs } from "react-router";

export const action = async ({ request }: ActionFunctionArgs) => {
    const {
        country,
        numberOfDays,
        travelStyle,
        interests,
        budget,
        groupType,
        userId,
    } = await request.json();

    const client = new OpenAI({
        apiKey: process.env.GROQ_API_KEY!,
        baseURL: "https://api.groq.com/openai/v1",
    });

    const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

    try {
        const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
    Budget: '${budget}'
    Interests: '${interests}'
    TravelStyle: '${travelStyle}'
    GroupType: '${groupType}'
    Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
    {
    "name": "A descriptive title for the trip",
    "description": "A brief description of the trip and its highlights not exceeding 100 words",
    "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
    "duration": ${numberOfDays},
    "budget": "${budget}",
    "travelStyle": "${travelStyle}",
    "country": "${country}",
    "interests": "${interests}",
    "groupType": "${groupType}",
    "bestTimeToVisit": [
      "🌸 Season (from month to month): reason to visit",
      "☀️ Season (from month to month): reason to visit",
      "🍁 Season (from month to month): reason to visit",
      "❄️ Season (from month to month): reason to visit"
    ],
    "weatherInfo": [
      "☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
      "🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
      "🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
      "❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)"
    ],
    "location": {
      "city": "name of the city or region",
      "coordinates": [latitude, longitude],
      "openStreetMap": "link to open street map"
    },
    "itinerary": [
      {
        "day": 1,
        "location": "City/Region Name",
        "activities": [
          {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
          {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
          {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
        ]
      }
    ]
    }`;

        // Call Groq API
        const completion = await client.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [{ role: "user", content: prompt }],
        });

        const rawText = completion.choices[0]?.message?.content || "";

        // Strip markdown code fences if Groq returns them despite instructions
        const jsonText = rawText.replace(/```json|```/g, "").trim();

        let trip: any;
        try {
            trip = JSON.parse(jsonText);
        } catch (parseErr) {
            console.error("Failed to parse Groq response as JSON:", parseErr);
            return new Response(
                JSON.stringify({ error: "Failed to parse AI response", raw: rawText }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        // Fetch Unsplash images
        const imageResponse = await fetch(
            `https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${unsplashApiKey}`
        );
        const imageUrls = (await imageResponse.json()).results
            .slice(0, 3)
            .map((result: any) => result.urls?.regular || null);

        const payload = {
            tripDetail: trip,
            imageUrls,
            createdAt: new Date().toISOString(),
            userId,
        };

        return new Response(JSON.stringify(payload), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (e) {
        console.error("Error creating trip:", e);
        return new Response(
            JSON.stringify({ error: String(e) }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};