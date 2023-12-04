import PublisherWrapper from "@/wrappers/Home/PublisherWrapper";
import SliderWrapper from "@/wrappers/Home/SliderWrapper";
import { Suspense } from "react";




export default function Home() {
  return (
    <main>
      <div >
        <div className="mb-10">
          <h1 className='text-3xl text-center font-bold '>Trending News</h1>
          <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[150px]"></span>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <SliderWrapper />
        </Suspense>
      </div>
      <div>
        <div className="mb-10">
          <h1 className='text-3xl text-center font-bold '>Our Renowned Publishers</h1>
          <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[250px]"></span>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <PublisherWrapper />
        </Suspense>
      </div>
    </main>
  );
}
