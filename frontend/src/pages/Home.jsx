import React from 'react'

const Home = () => {
  return (
    <div className='bg-[#00ADB5] px-12 h-screen lg:h-[80vh] flex flex-col items-center justify-center'>
      <div className='w-full flex items-center justify-between gap-4'>
        <div className='w-full lg:w-5/6'>
          <h1 className='text-4xl md:text-6xl lg:text-8xl font-bold text-center lg:text-left'>
            Create & Listen to the <br />
            <span className='flex items-end justify-center lg:justify-start mt-2 lg:mt-0'>
              p
              <span>
                <img className='h-10 md:h-12 mx-2 lg:h-20' src="https://cdn-icons-png.flaticon.com/512/1599/1599676.png" alt="Podcast icon" />
              </span>
              dcast
            </span>
          </h1>
        </div>
        <div className='hidden lg:block w-1/6'>

        </div>
      </div>

      <div className='w-full mt-12 flex flex-col lg:flex-row items-center justify-between'>
        <div className='flex flex-col items-center lg:items-start'>
          <p className='text-xl font-semibold text-center lg:text-left'>
            Listen to the most popular podcasts on one platform - <b>PodcastShow</b>
          </p>

        </div>
        <div className='mt-8 lg:mt-0'>
          <p className='text-zinc-800 font-bold text-center lg:text-right'>
            Our app contains more than 2000 podcasts for you
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
