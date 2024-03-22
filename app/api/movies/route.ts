import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function GET(req: NextRequest, { params }: { params: { id?: string, sortBy?: string } }) {
    
    const searchParams = req.nextUrl.searchParams;
    const sortBy = searchParams.get('sortBy');

    if (!searchParams) {
        const allMovies = await prisma.movie.findMany()
        return NextResponse.json(allMovies)
    }
    console.log(typeof sortBy);
    
    if (sortBy?.includes("latest")) {
        const searchedMovie = await prisma.movie.findMany({orderBy:{addingTime:"asc"},take:10})
        
        return NextResponse.json(searchedMovie)
    }

    return NextResponse.json(sortBy)
    
}