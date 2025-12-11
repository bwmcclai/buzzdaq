import { NextResponse } from 'next/server';
import { initDatabase, seedDatabase } from '@/lib/db';

/**
 * GET /api/setup
 * Initialize and seed the database
 * Run this once after deploying to set up your database
 */
export async function GET() {
  try {
    console.log('Initializing database...');
    await initDatabase();
    console.log('Database initialized successfully');

    console.log('Seeding database...');
    await seedDatabase();
    console.log('Database seeded successfully');

    return NextResponse.json({
      success: true,
      message: 'Database initialized and seeded successfully',
    });
  } catch (error) {
    console.error('Error setting up database:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to setup database',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
