/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uVG77qDcbLd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { ArrowRight } from '@/components/ArrowRight';

import LandingEmail from '@/components/landing-email';

export default function Component() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 px-10 lg:grid-cols-[1fr_400px] lg:gap-4 xl:grid-cols-[1fr_600px]">
            <img
              alt="Hero"
              className="mx-auto overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              height="550"
              src="images/hero.png"
              width="550"
            />
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  EasyGrade
                </h1>
                <p className="max-w-[600px] text-gray-900 md:text-xl dark:text-gray-400">
                  Homeworks made simple.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {/* <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/login"
                >
                  Login
                </Link> */}
                {/* <input
                  type="email"
                  className="border"
                  value={messageText}
                  onChange={handleTextChange}
                  placeholder="Enter email address"
                ></input>
                <button
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  onClick={insertRow}
                >
                  Submit
                </button> */}
                <LandingEmail />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-amber-400">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Faster generation. Improved feedback.
              </h2>
              <p className="max-w-[900px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform allows teachers to focus on what they do
                best–Teach! We take care of the rest.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-2xl font-bold">
                        Homework Generation
                      </h3>
                      <p className="text-black">
                        Generate homeworks with ease. No more manual assignment
                        creation.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-2xl font-bold">Grading</h3>
                      <p className="text-black">
                        Automate assigning grades to students.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-2xl font-bold">Feedback</h3>
                      <p className="text-black">
                        Provide personalized feedback to students with ease.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <img
                alt="Image"
                className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="images/features.png"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Lesson plans made simple.
            </h2>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
            <img src="images/lesson-plan-arithmetic.png" alt="Lesson plan" />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end items-center">
            <img
              className="w-2/3"
              src="images/ocr-phone.png"
              alt="OCR for homeworks"
            />
            <ArrowRight />
            <img
              className="w-2/3"
              src="images/graded.png"
              alt="Graded homework assignment"
            />
          </div>
          <div className="space-y-2">
            <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Effortless grading, personalized feedback.
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
