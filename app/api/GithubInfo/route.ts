import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { username } = await req.json();
        const url = `https://api.github.com/users/${username}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from GitHub');
        }

        const data = await response.json();
        return NextResponse.json({ Message: data }, { status: 200 });
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
