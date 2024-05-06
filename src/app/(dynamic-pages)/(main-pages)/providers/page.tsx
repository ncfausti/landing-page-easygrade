/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uVG77qDcbLd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';
import { ArrowRight } from '@/components/ArrowRight';
import { useRouter } from 'next/navigation';
import LandingEmail from '@/components/landing-email';
import Image from 'next/image';

export default function Component() {
  const router = useRouter();

  // TODO: Nick - Pls add about API integration. I wouldn't know the right words to put that

  return (
    <>
      <section className="w-full py-3 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 px-10 lg:grid-cols-[1fr_600px] lg:gap-4 xl:grid-cols-[1fr_800px]">
            <Image
              width={700}
              height={410}
              alt="Hero"
              className="mx-auto overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              src="/images/TeacherAssist_hero.png"
            />
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="">Teacher Assist</h1>
                <p className="max-w-[400px] font-bold text-gray-900 md:text-xl dark:text-gray-400">
                  Homework Management System
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
              <p className="hidden max-w-[600px] text-gray-900 md:text-xl dark:text-gray-400">
                Give your LMS the AI Edge with TeachAssist.
              </p>
              <p className="max-w-[600px] text-gray-900 md:text-xl dark:text-gray-400">
                Stay ahead - Gain and retain more customers.
              </p>
              <button
                onClick={() => router.push('/generate')}
                className="btn bg-white border-2 border-black rounded-full p-3"
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center ">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl">
                Streamlined Homework Management
              </h2>
              <h4 className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                With TeacherAssist seamlessly integrated into your LMS, offer
                schools the ability to effortlessly generate adaptive homework
                assignments.
              </h4>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-2xl font-bold">Generate</h3>
                      <p className="text-gray-800 text-xl">
                        Offer schools the ability to effortlessly generate
                        adaptive homework assignments.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-2xl font-bold">Simplify</h3>
                      <p className="text-gray-800  text-xl">
                        Allows teachers to create personalized tasks for any
                        topic, grade, or subject with just two clicks.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-2xl font-bold">Customize</h3>
                      <p className="text-gray-800  text-xl">
                        Templates featuring school logos add a professional
                        touch to printed materials, enhancing brand visibility.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                width={500}
                height={310}
                alt="Image"
                className="hidden md:block mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                src="/images/features.png"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-center sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Automated Grading Solutions
            </h2>
            <p className="text-center text-xl py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Revolutionize homework grading with TeacherAssist's OCR
              technology. By automating the grading process, our tool eliminates
              the time-consuming task of manual assessment. Students can scan
              completed worksheets, receiving instant feedback on their
              performance. This not only boosts learning outcomes by 75% but
              also reduces administrative burden, all without the need for
              devices – just a quick snapshot!
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
            <Image
              width={500}
              height={310}
              src="/images/lesson-plan-arithmetic.png"
              alt="Lesson plan"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end items-center">
            <Image
              width={500}
              height={310}
              className="w-1/2"
              src="/images/ocr-phone.png"
              alt="OCR for homeworks"
            />
            <ArrowRight />
            <Image
              width={500}
              height={310}
              className="w-1/2"
              src="/images/graded.png"
              alt="Graded homework assignment"
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-center lg:leading-tighter text-3xl tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Targeted Remedial Support
            </h2>
            <p className="text-center text-xl py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Automatic grading of homeworks using your phone's camera, while
              also providing personalized feedback to students.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-center lg:leading-tighter text-3xl tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Efficient Management Dashboards
            </h2>
            <p className="text-center text-xl py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Enhance LMS functionality with TeacherAssist's intuitive teacher
              dashboard. Empower educators to effortlessly track homework
              submissions, grades, and generate remedial assignments with a
              single click. By streamlining administrative tasks, our tool
              enables teachers to allocate more time to impactful teaching
              practices, ultimately driving academic success.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end items-center">
            <Image
              width={500}
              height={310}
              className="w-full"
              src="/images/grades-dashboard.png"
              alt="OCR for homeworks"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container flex flex-col items-center px-4 md:px-6 lg:gap-10">
          <h2 className="text-center lg:leading-tighter text-3xl tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
            Fuel Your Business Growth with TeacherAssist
          </h2>
          <p className="text-center py-2 text-2xl max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            With <strong>TeacherAssist</strong> as your ally, give AI wings to
            your LMS offerings. Drive <strong>differentiation</strong>, enhance{' '}
            <strong>customer satisfaction</strong>, and{' '}
            <strong>future-proof</strong> your business against industry shifts.
            By staying ahead of the curve with innovative solutions, you
            position your company as a{' '}
            <strong>leader in the education technology space</strong>, primed
            for sustained growth and success.
          </p>
        </div>
      </section>
    </>
  );
}
