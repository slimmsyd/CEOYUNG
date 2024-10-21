import Navbar from "../components/navbar";
import Footer from "../components/footer";

import GlobalButton from "../components/globalbutton";
export default function AI() {
  return (
    <div>
      <Navbar />
      <section
        class="flex justify-center relative z-10 overflow-hidden bg-[#111111] text-white "
        style={{
          backgroundImage: "url('/images/Purple_Bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="container">
          <div class="relative">
            <div class="mx-auto w-full max-w-[725px] pt-[76px] text-center">
              <div class="relative inline-flex">
                <span class="absolute -left-5 -top-4">
                  <svg
                    width="25"
                    height="26"
                    viewBox="0 0 25 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.9416 17.8206C23.3028 16.4115 23.4236 11.1442 21.0174 1.34855"
                      stroke="#3758F9"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M18.4497 20.1009C16.4202 16.7823 10.1542 8.86717 1.32593 3.75581"
                      stroke="#3758F9"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M13.2325 23.3676C11.4024 22.2892 6.60438 20.2261 2.05347 20.6008"
                      stroke="#3758F9"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </span>
                <h1 class="mb-4 text-[60px] font-extrabold leading-tight text-dark   dark:text-white">
                  Introducing Your Personal Money Making Assistant.
                  <span class="bg-gradient-to-l from-[#007AFF] via-[#007AFF] to-transparent bg-clip-text text-transparent">
                    YungCEO AI
                  </span>
                </h1>
              </div>

              <p class="mb-9 text-base text-body-color sm:text-lg dark:text-dark-6">
                AI content generation website is a platform that utilizes
                artificial intelligegnce technologies, such as natural lanauge
                processing, to generate content.
              </p>

              <a
                href="https://whop.com/yungceo/"
                class="mb-4 inline-flex items-center justify-center rounded-lg bg-[#007AFF] px-6 py-3 text-base font-medium text-white hover:bg-primary/90"
              >
                Get Started
              </a>

              <p class="mb-10 text-sm text-dark dark:text-white">
                Powered by Discord
              </p>

              <div className="mt-8 mx-auto max-w-[800px] rounded-lg border border-gray-300 border-opacity-50 overflow-hidden">
                <video
                  className="w-full h-auto"
                  controls
                  src="/path/to/your/video.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[50vh] bg-[rgb(16,16,20)] ">
        <div
          id="team"
          class="bg-neutral-100 py-6 dark:bg-neutral-900 sm:py-8 lg:py-12"
        >
          <div class="mx-auto max-w-screen-xl px-4 md:px-8">
            <div class="mb-8 md:mb-12">
              <h2 class="mb-4 text-center text-[20px] font-bold text-neutral-500  md:mb-6 ">
                Join The Family
              </h2>

              <p class="mx-auto max-w-screen-md text-center text-neutral-500 md:text-lg">
                We currently have only been running for a few months and have
                reached a large amount of people and provide a lot of
                oppourtunities to the Hungry to Eat.{" "}
              </p>

              <div class="flex flex-row justify-between mt-8 max-w-[750px] mx-auto">
                <div class="flex flex-col items-center">
                  <h3 class="text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                    1
                  </h3>
                  <p class="text-neutral-600 dark:text-neutral-400">Mission</p>
                </div>
                <div class="flex flex-col items-center">
                  <h3 class="text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                    10,000+ +
                  </h3>
                  <p class="text-neutral-600 dark:text-neutral-400"> Members</p>
                </div>
                <div class="flex flex-col items-center">
                  <h3 class="text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                    150,000 +
                  </h3>
                  <p class="text-neutral-600 dark:text-neutral-400">
                  Followers
                  </p>
                </div>
                <div class="flex flex-col items-center">
                  <h3 class="text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                    ♾️
                  </h3>
                  <p class="text-neutral-600 dark:text-neutral-400">Opportunities                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="flex justify-center relative z-10 overflow-hidden bg-[#111111] text-white p-8 ">
        <div class="container">
          <div class="-mx-4 flex flex-wrap items-center justify-between">
            <div class="w-full px-4 lg:w-1/2 xl:w-6/12">
              <div class="w-full max-w-[570px] py-14 xl:py-20">
                <span class="flex w-fit items-center gap-2 rounded-[30px] py-1.5 px-4 bg-[#2c2c33] text-[14px] mb-2 font-semibold text-primary">
                  New!
                </span>
                <h1 class="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[52px]/[1.25] lg:text-4xl xl:text-[52px]/[1.25] dark:text-white">
                  Generate High Quality Digital Products &amp; Documents In
                  Seconds
                </h1>
                <p class="mb-8 text-base text-dark-3 dark:text-dark-5">
                  Generate AdvancedContracts, Guides, Planners, &amp; Much More
                  in seconds using YCAI. Powered by Discord.
                </p>

                <div class="flex w-full gap-3 max-sm:flex-col sm:items-center">
                  <input
                    type="text"
                    placeholder="Start with a detailed description"
                    class="h-12 w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-body-color outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                  />

                  <a href="https://whop.com/yungceo/">
                    <button class="h-12 rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90">
                      Generate
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div class="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div class="flex gap-6">
                <div class="flex w-1/2 flex-col gap-y-6 *:w-full *:rounded-[10px]">
                  <a href="https://ibb.co/sHNM2br">
                    <img
                      src="https://i.ibb.co/WtMY6G1/D6.png"
                      alt="D6"
                      border="0"
                    />{" "}
                  </a>
                  <a href="https://ibb.co/j89nYzy">
                    <img
                      src="https://i.ibb.co/NFgcqr9/D5.png"
                      alt="D5"
                      border="0"
                    />
                  </a>
                  <a href="https://ibb.co/9wLTvLR">
                    <img
                      src="https://i.ibb.co/VHZSNZX/D4.png"
                      alt="D4"
                      border="0"
                    />
                  </a>
                </div>

                <div class="flex w-1/2 flex-col gap-y-6 *:w-full *:rounded-[10px]">
                  <a href="https://ibb.co/nfrKCPV">
                    <img
                      src="https://i.ibb.co/BjLYNn7/298274549139767317-response-82-pdf.png"
                      alt="298274549139767317-response-82-pdf"
                      border="0"
                    />
                  </a>
                  <a href="https://ibb.co/sHvxBJF">
                    <img
                      src="https://i.ibb.co/pyvVmr3/D2.png"
                      alt="D2"
                      border="0"
                    />
                  </a>
                  <a href="https://ibb.co/tK3BLHQ">
                    <img
                      src="https://i.ibb.co/GpF7Hdn/D1.png"
                      alt="D1"
                      border="0"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="flex justify-center relative z-10 overflow-hidden bg-[#111111] text-white">
        <div class="container mx-auto p-8">
          <div class="-mx-4 mb-10 flex flex-wrap items-center lg:mb-[60px]">
            <div class="w-full px-4 lg:w-6/12">
              <div class="mb-[60px] max-w-[500px] xl:mb-[70px]">
                <span class="flex w-fit items-center gap-2 rounded-[30px] py-1.5 px-4 bg-[#2c2c33] text-[14px] mb-2 font-semibold text-primary">
                  About YungCEO AI
                </span>
                <h2 class="text-dark dark:text-white text-3xl font-bold sm:text-4xl md:text-[40px]">
                  Turn your phone into a money printer!
                </h2>
              </div>
              <div class="flex flex-wrap -mx-4">
                <div class="w-full px-4 sm:w-1/2">
                  <div class="mb-10">
                    <div class="mb-6 flex h-[75px] w-[75px] items-center justify-center rounded-[20px] bg-[#4BA0FF] text-white">
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 512 512"
                        class="fill-current"
                      >
                        <path
                          class="st0"
                          d="M406.195,383.984c-8.391,15.734-19.922,28.859-34.516,39.609c-14.656,10.719-32.188,18.703-52.563,23.969
                             c-8.906,2.25-18.234,3.813-27.703,5.094V512h-70.828v-58.156c-20.172-1.703-39.453-4.844-57.609-9.844
                             c-27.719-7.594-64.016-38.25-64.016-38.25c-3.109-1.813-5.172-5-5.609-8.531c-0.453-3.563,0.766-7.156,3.313-9.688l35.484-35.5
                             c3.828-3.781,9.766-4.5,14.359-1.688c0,0,26.563,23.063,46.688,28.563c20.125,5.469,40.094,8.219,60.016,8.219
                             c25.125,0,45.891-4.438,62.359-13.313c16.5-8.938,24.719-22.75,24.719-41.625c0-13.594-4.031-24.313-12.172-32.188
                             c-8.109-7.813-21.828-12.734-41.188-14.891l-63.563-5.469c-37.641-3.672-66.672-14.172-87.063-31.375
                             c-20.453-17.266-30.609-43.453-30.609-78.453c0-19.375,3.906-36.625,11.766-51.797c7.875-15.172,18.563-27.984,32.172-38.422
                             c13.594-10.469,29.438-18.313,47.469-23.531c7.547-2.188,15.453-3.625,23.484-4.938V0h70.828v50.094
                             c16.531,1.625,32.266,4.281,46.906,8.313c24.844,6.781,50.938,27.188,50.938,27.188c3.266,1.688,5.484,4.875,6.047,8.5
                             c0.563,3.688-0.641,7.313-3.219,9.969l-33.281,33.781c-3.547,3.594-9.031,4.531-13.563,2.188c0,0-19.703-14.031-36.734-18.469
                             c-17.016-4.438-34.891-6.688-53.719-6.688c-24.609,0-42.797,4.719-54.531,14.109c-11.781,9.453-17.625,21.734-17.625,36.875
                             c0,13.641,4.109,24.078,12.531,31.359c8.359,7.344,22.469,12.109,42.359,14.125l55.703,4.75
                             c41.297,3.656,72.563,14.625,93.734,32.922c21.203,18.328,31.781,45.016,31.781,80.016
                             C418.742,350.016,414.554,368.281,406.195,383.984z"
                        ></path>
                      </svg>
                    </div>
                    <h3 class="text-dark dark:text-white mb-3 text-xl font-semibold 2xl:text-[22px]">
                      Premium Money Printing Methods
                    </h3>
                    <p class="text-base leading-relaxed text-body-color dark:text-dark-6">
                      YungCEO AI is trained on the best methods of generating
                      income online at any age and any skill level.
                    </p>
                  </div>
                </div>
                <div class="w-full px-4 sm:w-1/2">
                  <div class="mb-10">
                    <div class="mb-6 flex h-[75px] w-[75px] items-center justify-center rounded-[20px] bg-[#FBD06F] text-white">
                      <svg
                        width="512"
                        height="512"
                        viewBox="0 0 24 24"
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="scale(0.6667) translate(5, 5)">
                          <path
                            d="M21 10L12 5L3 10L6 11.6667M21 10L18 11.6667M21 10V10C21.6129 10.3064 22 10.9328 22 11.618V16.9998M6 11.6667L12 15L18 11.6667M6 11.6667V17.6667L12 21L18 17.6667L18 11.6667"
                            stroke="#FFFFFF"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            fill="none"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <h3 class="text-dark dark:text-white mb-3 text-xl font-semibold 2xl:text-[22px]">
                      Learn Life Changing Skills
                    </h3>
                    <p class="text-base leading-relaxed text-body-color dark:text-dark-6">
                      Skills and topics taught here have a high probability of
                      changing your life if you put in action behind them.
                    </p>
                  </div>
                </div>
                <div class="w-full px-4 sm:w-1/2">
                  <div class="mb-10">
                    <div class="mb-6 flex h-[75px] w-[75px] items-center justify-center rounded-[20px] bg-[#A097FF] text-white">
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.4721 16.7023C17.3398 18.2608 15.6831 19.3584 13.8064 19.7934C11.9297 20.2284 9.95909 19.9716 8.25656 19.0701C6.55404 18.1687 5.23397 16.6832 4.53889 14.8865C3.84381 13.0898 3.82039 11.1027 4.47295 9.29011C5.12551 7.47756 6.41021 5.96135 8.09103 5.02005C9.77184 4.07875 11.7359 3.77558 13.6223 4.16623C15.5087 4.55689 17.1908 5.61514 18.3596 7.14656C19.5283 8.67797 20.1052 10.5797 19.9842 12.5023M19.9842 12.5023L21.4842 11.0023M19.9842 12.5023L18.4842 11.0023"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill="none"
                        ></path>
                        <path
                          d="M12 8V12L15 15"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill="none"
                        ></path>
                      </svg>
                    </div>
                    <h3 class="text-dark dark:text-white mb-3 text-xl font-semibold 2xl:text-[22px]">
                      Updates
                    </h3>
                    <p class="text-base leading-relaxed text-body-color dark:text-dark-6">
                      Consistently Updated and Community Driven
                    </p>
                  </div>
                </div>
                <div class="w-full px-4 sm:w-1/2">
                  <div class="mb-10">
                    <div class="mb-6 flex h-[75px] w-[75px] items-center justify-center rounded-[20px] bg-[#48DB7A] text-white">
                      <svg
                        width="512"
                        height="512"
                        viewBox="0 0 512 512"
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="scale(0.6667) translate(128, 128)">
                          <path
                            class="st0"
                            d="M273.975,108.679c2.547,0.672,5.234,1.094,8.047,1.328l0.047,8.094l9.875-0.063l-0.063-8.266
     c1.328-0.188,2.625-0.422,3.875-0.75c2.828-0.766,5.266-1.891,7.297-3.391s3.625-3.359,4.766-5.563
     c1.172-2.188,1.719-4.734,1.703-7.656c-0.031-4.891-1.547-8.609-4.516-11.141c-2.953-2.531-7.344-4.031-13.094-4.484l-7.781-0.594
     c-2.766-0.281-4.75-0.922-5.906-1.953c-1.188-1-1.766-2.469-1.781-4.359c-0.016-2.094,0.781-3.828,2.422-5.172
     c1.609-1.313,4.156-1.984,7.594-2c2.625-0.031,5.109,0.281,7.484,0.875c2.391,0.594,5.156,2.547,5.156,2.547
     c0.625,0.313,1.391,0.188,1.875-0.328l4.609-4.75c0.359-0.359,0.516-0.875,0.422-1.375c-0.063-0.5-0.375-0.953-0.828-1.188
     c0,0-3.672-2.828-7.141-3.734c-2.047-0.547-4.25-0.906-6.547-1.109l-0.047-7l-9.875,0.078l0.047,7.141
     c-1.125,0.172-2.219,0.391-3.266,0.688c-2.516,0.75-4.719,1.875-6.594,3.328c-1.891,1.469-3.359,3.266-4.453,5.391
     c-1.063,2.141-1.594,4.547-1.578,7.234c0.031,4.891,1.469,8.531,4.344,10.922c2.844,2.375,6.906,3.813,12.172,4.266l8.859,0.719
     c2.703,0.281,4.625,0.953,5.75,2.016c1.156,1.109,1.719,2.594,1.734,4.484c0.016,2.641-1.109,4.578-3.406,5.844
     c-2.281,1.25-5.172,1.875-8.688,1.906c-2.766,0.016-5.547-0.344-8.359-1.094c-2.813-0.734-6.547-3.922-6.547-3.922
     c-0.641-0.391-1.469-0.281-2,0.234l-4.906,5.016c-0.359,0.328-0.516,0.828-0.453,1.328c0.047,0.5,0.344,0.938,0.781,1.188
     C265.006,103.413,270.1,107.647,273.975,108.679z"
                          ></path>
                          <path
                            class="st0"
                            d="M287.334,161.71c43.813-0.313,79.063-36.078,78.75-79.891c-0.297-43.813-36.078-79.094-79.891-78.766
     c-43.813,0.313-79.078,36.078-78.766,79.891C207.725,126.757,243.506,162.022,287.334,161.71z M286.334,22.882
     c32.813-0.219,59.688,26.266,59.938,59.063c0.219,32.828-26.281,59.703-59.094,59.938s-59.688-26.266-59.922-59.078
     S253.521,23.116,286.334,22.882z"
                          ></path>
                          <path
                            class="st0"
                            d="M507.412,168.288c-3.469-1.156-7.219,0.75-8.344,4.234c-2.938,8.938-6.922,14.016-11.406,17.406
     c-1.313,1-2.719,1.813-4.188,2.547c0.719-2.703,1.094-5.516,1.063-8.344c-0.031-4.484-1.047-9.078-3.547-13.172
     c-2.141-3.547-5.141-6.344-8.547-8.188c-3.422-1.859-7.25-2.813-11.125-2.797c-3.75,0.016-7.563,1-11.031,2.969
     c-0.063,0.016-0.109,0.031-0.156,0.078c-0.094,0.031-0.172,0.078-0.25,0.125h-0.031l0,0l-0.172,0.109l0,0
     c-0.016,0-0.016,0-0.031,0.016c-0.109,0.078-0.219,0.188-0.344,0.266c-0.016,0-0.016,0.016-0.031,0.016
     c-3.266,2.125-5.875,4.938-7.625,8.172c-1.859,3.406-2.828,7.234-2.797,11.125c0.016,3.984,1.109,8.031,3.297,11.656l0,0
     c2.781,4.531,6.844,8.156,11.547,10.828c0.891,0.516,1.844,0.938,2.797,1.375c-2.172,1.391-4.625,2.703-7.328,3.828
     c-3.578,1.484-7.625,2.609-12,3.234c-14.844-22.469-36.891-43.078-68.438-60.313c-5-2.734-10.141-5.125-15.344-7.234
     c-8.75,9.125-19.328,16.484-31.188,21.406c-4.656,1.969-5.141,5.906,0.281,6.547c4.844,0.563,9.625,1.25,14.422,2.031l0.172,23.844
     c-40.313-4.797-70.313-4.594-110.547,0.781l-0.172-23.828c6.813-1.234,13.688-2.234,20.578-3.031
     c6.391-0.703,6.281-5.328,0.297-8.172c-11.297-5.375-21.328-12.984-29.531-22.234c-25.172,7.078-47.516,17.203-64.016,27.672
     c-29.671-18.484-55.921-13.422-63.875-11.031l11.281,57.922c-21.516,27.016-38.953,36.141-38.953,36.141l-43.828,8.984
     c-6.203,0.031-11.984,3.203-15.359,8.406c-3.359,5.219-3.875,11.766-1.391,17.438l34.375,95.781
     c2.984,6.734,9.656,11.063,17.016,11l72.078,14.563l30.89,76.203c15.422,33.484,56.016,26.172,57.438-1.5l6.234-37.969
     l105.141-0.75c0,0,3.375,16.875,5.094,31.406c2.594,21.922,35.047,50.141,67.25,6.016c37.078-50.797,95.969-166.969,47.266-258.016
     c6.125-1.422,11.688-3.563,16.391-6.203c4.031-2.266,7.5-4.844,10.391-7.5c1.063-0.969,2.016-1.953,2.906-2.938
     c0.063-0.016,0.125-0.016,0.188-0.047l0.016,0.031c7.047-1.234,14.609-3.547,21.406-8.641c6.813-5.094,12.484-12.922,16.047-23.906
     C512.803,173.132,510.896,169.413,507.412,168.288z M470.178,190.71c-0.703,2.063-1.75,4-2.953,5.563
     c-2.281-0.328-4.766-1.188-7-2.469c-2.984-1.656-5.484-4.047-6.734-6.172v0.016c-0.953-1.563-1.391-3.219-1.391-4.891
     c-0.016-1.625,0.406-3.266,1.172-4.688c0.781-1.406,1.891-2.609,3.375-3.516c1.516-0.891,3.125-1.313,4.75-1.328
     c1.625-0.031,3.266,0.391,4.688,1.172c1.438,0.781,2.672,1.938,3.594,3.438c1,1.656,1.578,3.844,1.594,6.391
     C471.318,186.304,470.912,188.569,470.178,190.71z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <h3 class="text-dark dark:text-white mb-3 text-xl font-semibold 2xl:text-[22px]">
                      Affordable
                    </h3>
                    <p class="text-base leading-relaxed text-body-color dark:text-dark-6">
                      We stand on our mission first of helping people make money
                      at any age so we keep our prices affordable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full px-4 lg:w-6/12">
              <div class="flex justify-end">
                <a href="https://ibb.co/4jJn7FP">
                  <img
                    src="https://i.ibb.co/Wcs46Hg/Simple-Phone-Reminder-Valentine-s-Day-Instagram-Story.png"
                    alt="Simple-Phone-Reminder-Valentine-s-Day-Instagram-Story"
                    border="0"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

<div className = "bg-[#111111]"> 
<div className="flex flex-col max-w-[1000px] mx-auto items-start gap-[14px] text-white  px-8 ">
        <div
          id="pricingSection"
          className="flex flex-col items-center my-[100px]   gap-[14px]"
        >
          <h3>Pick Your Plan</h3>

          <div className="w-[80px] h-[2px] dividerLine"></div>

          <div className="flex md:flex-row flex-col gap-[10px]">
            <div className="pricingCard  h-full bg-transparent">
              <div className="flex flex-col items-center">
                <h3>Hustler</h3>
                <div className="flex flex-row gap-[5px] items-center">
                  <h2 className="text-[30px] font-bold text-[#2947da]">$7 </h2>
                  <div className="flex flex-col gap-[5px]">
                    <p>/ month</p>
                  </div>
                </div>

                <GlobalButton
                  href="https://calendly.com/ceo-terrapincrypto/30min?back=1&month=2024-09"
                  text="Select Basic"
                />
              </div>
              <div className="w-full my-[25px] h-[2px] dividerLine"></div>

              <div className="flex flex-col gap-[10px]">
                <div className="flex-1 space-y-3 rounded-lg px-4 py-6 dark:bg-dark-2">
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        100+ Digital Products done-for-you
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        (Must purchase MRR to sell list)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Custom Money Making AI Assistant & Digital Product/ PDF
                        Document Generator
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        (25 responses/month)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Image Upscaling & Restoration
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        (50 images/month)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Access to YungCEO Society Discord
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        (10,000+ Hustlers Working Together To Succeed)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Video Tutorials On Generating Income Online
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        Video lessons By YungCEO teaching you how to leverage AI
                        to generate passive income selling digital products and
                        more
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Premium Support
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        Weekly Money talks with YungCEO open to members
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pricingCard  h-full bg-transparent">
              <div className="flex flex-col items-center">
                <h3>Bread Winner</h3>
                <div className="flex flex-row gap-[5px] items-center">
                  <h2 className="text-[30px] font-bold text-[#2947da]">
                    $19.99{" "}
                  </h2>
                  <div className="flex flex-col gap-[5px]">
                    <p>/ month</p>
                  </div>
                </div>

                <GlobalButton
                  href="https://calendly.com/ceo-terrapincrypto/beginner-level-consultation?back=1&month=2024-09"
                  text="Select Team"
                />
              </div>
              <div className="w-full my-[25px] h-[2px] dividerLine"></div>

              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex-1 space-y-3 rounded-lg px-4 py-6 dark:bg-dark-2">
                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          400+ DigitalProducts & Zero To Glitching Ebook by
                          YungCEO
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (Must purchase MRR to sell done-for-you Source Files)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Custom Money Making AI Assistant & Digital Product/
                          PDF Document Generator
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (300 responses/month)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Image Upscaling & Background Removal
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (Unlimited)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Access to YungCEO Society Discord
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (10,000+ Hustlers Working Together To Succeed)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Video Tutorials On Generating Income Online
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          Video lessons By YungCEO teaching you how to leverage
                          AI to generate passive income selling digital products
                          and more
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Weekly Live Calls with YungCEO
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          Weekly Money talks with YungCEO open to members
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pricingCard  h-full bg-transparent">
              <div className="flex flex-col items-center">
                <h3>CEO</h3>
                <div className="flex flex-row gap-[5px] items-center">
                  <h2 className="text-[30px] font-bold text-[#2947da]">$71 </h2>
                  <div className="flex flex-col gap-[5px]">
                    <p>/ month</p>
                  </div>
                </div>

                <GlobalButton
                  href="https://calendly.com/ceo-terrapincrypto/intermediate-level-consultation?back=1"
                  text="Select Ceo"
                />
              </div>
              <div className="w-full my-[25px] h-[2px] dividerLine"></div>

              <div className="flex flex-col gap-[10px]">
                <div className="flex-1 space-y-3 rounded-lg px-4 py-6 dark:bg-dark-2">
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        400+ Digital Products & Zero To Glitching Ebook by
                        YungCEO
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        (MRR Rights for all products and access to all current
                        Done For You products - new products added Weekly)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        1 on 1 Call With YungCEO
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        (1 call/month)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Custom Money Making AI Assistant & Digital Product/ PDF
                        Document Generator
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        (Unlimited responses/month)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Image Upscaling & Restoration
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        (Unlimited images/month)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Access to YungCEO Society Discord
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        (10,000+ Members Of Hustlers Working Together To
                        Succeed)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Video Tutorials On Generating Income Online
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        Video lessons By YungCEO teaching you how to leverage AI
                        to generate passive income selling digital products and
                        more
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[#007AFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Weekly Live Calls with YungCEO
                      </span>
                      <br />
                      <span className="text-sm text-neutral-500">
                        Weekly Money talks with YungCEO open to members
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

</div>
    

      <Footer />
    </div>
  );
}
