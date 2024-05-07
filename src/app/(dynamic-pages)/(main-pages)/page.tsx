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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Component() {
  const router = useRouter();

  return (
    <>
      <section className="w-full py-6 md:py-24 bg-main">
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
                <h1 className="text-5xl">Teacher Assist</h1>
                <h2 className="max-w-[400px] font-bold text-gray-900 md:text-xl dark:text-gray-400">
                  Cut administrative costs by 30%.
                </h2>
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
              <p className="text-center max-w-[600px] text-gray-900 md:text-xl dark:text-gray-400">
                Increase academic outcomes 2x. <br></br>Improve student learning
                experience.
              </p>

              <button
                onClick={() => router.push('/generate')}
                className="btn bg-white border-2 border-black rounded-full p-3 font-bold"
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
        <div className="hidden flex w-full justify-evenly pt-6 min-h-[200px] items-center font-bold">
          {/* <div className="bg-white border-2 border-black rounded-full p-3 px-6 h-full"> */}
          <button
            onClick={() => router.push('/providers')}
            className="btn bg-white border-2 border-black rounded-full p-3"
          >
            Providers
          </button>
          <button
            onClick={() => router.push('/')}
            className="btn bg-white border-2 border-black rounded-full p-3"
          >
            Schools
          </button>
          <button
            onClick={() => router.push('/grade')}
            className="btn bg-white border-2 border-black rounded-full p-3"
          >
            Students
          </button>
          {/* </div> */}
          {/* <div className="bg-white border-2 border-black rounded-full p-3 px-6 h-full">
            Schools
          </div>
          <div className="bg-white border-2 border-black rounded-full p-3 px-6 h-full">
            Students
          </div> */}
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center ">
            <div className="space-y-2">
              <h2 className="max-w-[900px] text-3xl sm:text-5xl">
                How we enable our teachers to personalise learning
              </h2>
              <h4 className="max-w-[900px] text-gray-800 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                In a class of 30 different kids without devices, personalization
                becomes a huge challenge. Welcome to TeacherAssist, where
                innovation meets education to revolutionize homework management
                for schools!
              </h4>
            </div>
            {/*  Our tool simplifies the process, allowing teachers to create
            personalized tasks for any topic, grade, or subject with just two clicks.
            Plus, customizable templates featuring school logos add a professional
            touch to printed materials, enhancing brand visibility.
             */}
            <div className="space-y-2">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="hidden">
                  Let's explore how TeacherAssist can empower your school
                  community:
                </h2>
                <Tabs defaultValue="homework" className="w-full text-xl">
                  <TabsList className="mb-8">
                    <TabsTrigger className="text-lg" value="homework">
                      Homework Creation
                    </TabsTrigger>
                    <TabsTrigger className="text-lg" value="grading">
                      Instant Feedback &amp; Grading
                    </TabsTrigger>
                    <TabsTrigger className="text-lg" value="remediation">
                      Targeted Remediation
                    </TabsTrigger>
                    <TabsTrigger className="text-lg" value="reporting">
                      Monitoring &amp; Reporting
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="homework">
                    <div className="flex flex-col max-w-[1000px] justify-center space-y-6">
                      <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold space-y-4">
                          Effortless Homework Creation
                        </h3>
                        <p className="text-center py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                          Say goodbye to time-consuming homework planning!
                          TeacherAssist simplifies the process, allowing
                          teachers to generate adaptive assignments for any
                          grade, subject, or topic in just two clicks. With
                          customizable templates featuring your school logo,
                          personalized printable homework tasks are created
                          effortlessly, promoting student engagement and pride
                          in their work.
                        </p>
                        <Image
                          width={500}
                          height={310}
                          className="my-6"
                          src="/images/lesson-plan-arithmetic.png"
                          alt="Lesson plan"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="grading">
                    <div className="flex flex-col justify-center space-y-6">
                      <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold space-y-4">
                          Instant Feedback and Grading
                        </h3>
                        <p className="items-center py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                          Experience the power of automated grading with
                          TeacherAssist's OCR technology. Students simply scan
                          completed worksheets/notebooks receiving instant
                          feedback on their homework. This not only boosts
                          learning outcomes by 75% but also reduces
                          administrative burden.
                        </p>
                        <div className="flex items-center">
                          <Image
                            width={200}
                            height={150}
                            className=""
                            src="/images/ocr-phone.png"
                            alt="OCR for homeworks"
                          />
                          <ArrowRight />
                          <Image
                            width={200}
                            height={150}
                            className="my-6"
                            src="/images/graded.png"
                            alt="Graded homework assignment"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="remediation">
                    <div className="flex flex-col justify-center space-y-6">
                      <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold space-y-4">
                          Targeted Remediation for Student Success
                        </h3>
                        <p className="items-center py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                          Addressing learning gaps has never been easier.
                          TeacherAssist analyzes student performance data to
                          generate personalized remedial worksheets aligned with
                          curriculum objectives. By providing targeted support,
                          our tool ensures that every student receives the
                          assistance they need to thrive academically, promoting
                          a culture of excellence within your school community.
                        </p>
                        <div className="flex items-center my-6">
                          <Image
                            width={200}
                            height={150}
                            className=""
                            src="/images/ocr-phone.png"
                            alt="OCR for homeworks"
                          />
                          <ArrowRight />
                          <Image
                            width={200}
                            height={150}
                            className=""
                            src="/images/graded.png"
                            alt="Graded homework assignment"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reporting">
                    <div className="flex flex-col max-w-[1000px] justify-center space-y-6">
                      <div className="flex flex-col min-[400px]:items-center lg:justify-end">
                        <h3 className="text-2xl font-bold">
                          Efficient Monitoring and Reporting
                        </h3>
                        <p
                          className="items-center py-4 max-w-[900px] text-gray-800
                        md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 "
                        >
                          Keep track of homework submissions and grades
                          effortlessly with TeacherAssist's comprehensive
                          monitoring tools. Administrators gain valuable
                          insights into student progress, enabling informed
                          decision-making to support student success. With
                          streamlined reporting capabilities, educators can
                          easily communicate student progress to parents,
                          fostering a collaborative learning environment.
                        </p>
                        <Image
                          width={500}
                          height={210}
                          className="my-6"
                          src="/images/grades-dashboard.png"
                          alt="Graded homework assignment"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
