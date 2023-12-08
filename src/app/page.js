import AppNotice from "@/pagesx/home/AppNotice";
import Banner from "@/pagesx/home/Banner";
import Faq from "@/pagesx/home/Faq";
import Plans from "@/pagesx/home/Plans";
import PublisherWrapper from "@/wrappers/Home/PublisherWrapper";
import UserStatisticWrapper from "@/wrappers/Home/UserStatisticWrapper";
import { Suspense } from "react";




export default function Home() {
  return (
    <main>
      <div className="mb-6">
        <Banner />
      </div>
      <div className="mb-6">
        <div className="mb-10">
          <h1 className='text-3xl text-center font-bold '>Trending News</h1>
          <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[150px]"></span>
        </div>
        {/* <Suspense fallback={<p>Loading...</p>}>
          <SliderWrapper />
        </Suspense> */}
      </div>
      <div className="mb-6">
        <div className="mb-10">
          <h1 className='text-3xl text-center font-bold '>Our Renowned Publishers</h1>
          <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[250px]"></span>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <PublisherWrapper />
        </Suspense>
      </div>
      <div className="mb-6">
        <div className="mb-10">
          <h1 className='text-3xl text-center font-bold '>Our Plans</h1>
          <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[250px]"></span>
        </div>
        <Plans />
      </div>
      <div className="mb-6">
        <div className="mb-10">
          <h1 className='text-3xl text-center font-bold '>Statistics</h1>
          <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[100px]"></span>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <UserStatisticWrapper />
        </Suspense>
      </div>
      <div className="mb-6">
        <div className="mb-10">
          <h1 className='text-3xl text-center font-bold '>Predicted FAQs</h1>
          <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[150px]"></span>
        </div>
        <Faq />
      </div>
      <div className="mb-6">
        <div className="mb-10">
          <h1 className='text-3xl text-center font-bold '>App Notice</h1>
          <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[150px]"></span>
        </div>
        <AppNotice />
      </div>

    </main>
  );
}
