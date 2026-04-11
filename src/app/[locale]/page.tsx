import { getLocale } from "next-intl/server";
import HomeClient from "./HomeClient";

// Vercel ISR Cache: Re-fetch new database data in the background every 60 seconds
export const revalidate = 60; 

export default async function HomePage() {
  const locale = await getLocale();
  
  // Fetch both the Projects and Testimonials at the exact same time (Concurrency)
  try {
    const [projectsRes, testimonialsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects?depth=1&locale=${locale}`, { 
        next: { revalidate: 60 } 
      }),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/testimonials?where[featured][equals]=true&locale=${locale}`, { 
        next: { revalidate: 60 } 
      })
    ]);

    const projectsData = await projectsRes.json();
    const testimonialsData = await testimonialsRes.json();

    return (
      <HomeClient 
        projects={projectsData?.docs || []} 
        testimonials={testimonialsData?.docs || []} 
      />
    );
  } catch (error) {
    console.error("Server Fetching Error:", error);
    // If the database is unreachable, load the site anyway with empty arrays
    return <HomeClient projects={[]} testimonials={[]} />;
  }
}