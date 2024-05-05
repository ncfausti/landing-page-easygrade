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
  // / HOME - SCHOOLS
  // Increase academic outcomes 2x and student learning experience
  // Cut administrative work for teachers by 30%

  // How do we enable our teachers to personalise learning in a class of 30 different kids without devices?
  // Welcome to TeacherAssist, where innovation meets education to revolutionize
  // homework management for schools! Our AI-powered tool is tailored to meet the
  // unique needs of educators, administrators, and students alike.

  // Let's explore how TeacherAssist can empower your school community:

  // 1. 	Effortless Homework Creation: Say goodbye to time-consuming homework planning!
  // TeacherAssist simplifies the process, allowing teachers to generate adaptive assignments
  // for any grade, subject, or topic in just two clicks. With customizable templates featuring
  // your school logo, personalized printable homework tasks are created effortlessly, promoting
  // student engagement and pride in their work.

  // 2. 	Instant Feedback and Grading: Experience the power of automated grading with TeacherAssist's
  // OCR technology. Students simply scan completed worksheets/notebooks receiving instant feedback
  // on their homework. This not only boosts learning outcomes by 75% but also reduces administrative burden.

  // 3. 	Targeted Remediation for Student Success: Addressing learning gaps has never been easier.
  //  TeacherAssist analyzes student performance data to generate personalized remedial worksheets
  // aligned with curriculum objectives. By providing targeted support, our tool ensures that every
  // student receives the assistance they need to thrive academically, promoting a culture of
  // excellence within your school community.

  // 4. 	Efficient Monitoring and Reporting: Keep track of homework submissions and grades
  // effortlessly with TeacherAssist's comprehensive monitoring tools. Administrators gain
  // valuable insights into student progress, enabling informed decision-making to support
  // student success. With streamlined reporting capabilities, educators can easily communicate
  // student progress to parents, fostering a collaborative learning environment.

  // Covid has caused substantial learning gaps that is difficult to reverse
  // High screen time is proven to cause anxiety in young learners
  // AssistTeacher solves for personalised learning through homework to help children bridge the learning gap, without needing to use a device. Harnessing the power of AI and OCR technology, our tool streamlines homework management, grading, and remediation, paving the way for enhanced teaching and learning experiences.

  // Sign up to be the trendsetter in integrating AI to personalise learning in school
  // Making the boring homework – interesting and remedial to help students gain confidence and academic excellence

  return (
    <>
      <section className="w-full pt-6 md:pt-24 lg:pt-32 xl:pt-48">
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
                  Increase academic outcomes 2x &amp; improve student learning
                  experience
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
              <p className="max-w-[600px] text-gray-900 md:text-xl dark:text-gray-400">
                Cut administrative work for teachers by 30%
              </p>

              <button
                onClick={() => router.push('/grade')}
                className="btn bg-white border-2 border-black rounded-full p-3 font-bold"
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-evenly pt-6 min-h-[200px] items-center font-bold">
          <div className="bg-white border-2 border-black rounded-full p-3 px-6 h-full">
            LMSs
          </div>
          <div className="bg-white border-2 border-black rounded-full p-3 px-6 h-full">
            Schools
          </div>
          <div className="bg-white border-2 border-black rounded-full p-3 px-6 h-full">
            Students
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center ">
            <div className="space-y-2">
              <h2 className="max-w-[900px] text-3xl sm:text-5xl">
                How we enable our teachers to personalise learning
              </h2>
              <p className="max-w-[900px] text-gray-800 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                In a class of 30 different kids without devices, personalization
                becomes a huge challenge. Welcome to TeacherAssist, where
                innovation meets education to revolutionize homework management
                for schools!
              </p>
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
                    {/* <p className="text-gray-800"></p> */}
                    <div className="flex flex-col max-w-[1000px] justify-center space-y-6">
                      <h3 className="text-2xl font-bold space-y-4">
                        Effortless Homework Creation
                      </h3>
                      {/* Explore how TeacherAssist can empower your school community
          </h2> */}
                      <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
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
                          src="/images/lesson-plan-arithmetic.png"
                          alt="Lesson plan"
                        />
                      </div>
                    </div>
                    {/* <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                      <Image
                        width={500}
                        height={310}
                        src="/images/lesson-plan-arithmetic.png"
                        alt="Lesson plan"
                      />
                    </div> */}
                  </TabsContent>
                  <TabsContent value="grading">
                    <div className="flex flex-col max-w-[1000px] justify-center space-y-6">

                      {/* Explore how TeacherAssist can empower your school community
          </h2> */}
                      <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center lg:justify-end">
                        <p className="items-center w-1/2 py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                          <h3 className="text-2xl font-bold">
                            Instant Feedback and Grading
                          </h3>
                          Experience the power of automated grading with
                          TeacherAssist's OCR technology. Students simply scan
                          completed worksheets/notebooks receiving instant
                          feedback on their homework. This not only boosts
                          learning outcomes by 75% but also reduces
                          administrative burden.
                        </p>
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

                    {/* <p className="text-gray-800">
                      Experience the power of automated grading with
                      TeacherAssist's OCR technology. Students simply scan
                      completed worksheets/notebooks receiving instant feedback
                      on their homework. This not only boosts learning outcomes
                      by 75% but also reduces administrative burden.
                    </p>
                  </TabsContent>
                  <TabsContent value="remediation">
                    <h3 className="text-2xl font-bold">
                      Targeted Remediation for Student Success
                    </h3>
                    <p className="text-gray-800">
                      Addressing learning gaps has never been easier.
                      TeacherAssist analyzes student performance data to
                      generate personalized remedial worksheets aligned with
                      curriculum objectives. By providing targeted support, our
                      tool ensures that every student receives the assistance
                      they need to thrive academically, promoting a culture of
                      excellence within your school community.
                    </p> */}
                  </TabsContent>
                  <TabsContent value="reporting">
                    <h3 className="text-2xl font-bold">
                      Efficient Monitoring and Reporting
                    </h3>
                    <p className="text-gray-800">
                      Keep track of homework submissions and grades effortlessly
                      with TeacherAssist's comprehensive monitoring tools.
                      Administrators gain valuable insights into student
                      progress, enabling informed decision-making to support
                      student success. With streamlined reporting capabilities,
                      educators can easily communicate student progress to
                      parents, fostering a collaborative learning environment.
                    </p>
                  </TabsContent>
                </Tabs>

                <ul className="hidden grid gap-6">
                  <li className="flex">
                    <div className="grid gap-1">
                      <h3 className="text-2xl font-bold">
                        Effortless Homework Creation
                      </h3>
                      <p className="text-gray-800">
                        Say goodbye to time-consuming homework planning!
                        TeacherAssist simplifies the process, allowing teachers
                        to generate adaptive assignments for any grade, subject,
                        or topic in just two clicks. With customizable templates
                        featuring your school logo, personalized printable
                        homework tasks are created effortlessly, promoting
                        student engagement and pride in their work.
                      </p>
                      <Image
                        width={500}
                        height={310}
                        alt="Image"
                        className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                        src="/images/features.png"
                      />
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-2xl font-bold">
                        Instant Feedback and Grading
                      </h3>
                      <p className="text-gray-800">
                        Experience the power of automated grading with
                        TeacherAssist's OCR technology. Students simply scan
                        completed worksheets/notebooks receiving instant
                        feedback on their homework. This not only boosts
                        learning outcomes by 75% but also reduces administrative
                        burden.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-2xl font-bold">
                        Targeted Remediation for Student Success
                      </h3>
                      <p className="text-gray-800">
                        Templates featuring school logos add a professional
                        touch to printed materials, enhancing brand visibility.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-2xl font-bold">
                        Efficient Monitoring and Reporting
                      </h3>
                      <p className="text-gray-800">
                        Keep track of homework submissions and grades
                        effortlessly with TeacherAssist's comprehensive
                        monitoring tools. Administrators gain valuable insights
                        into student progress, enabling informed decision-making
                        to support student success. With streamlined reporting
                        capabilities, educators can easily communicate student
                        progress to parents, fostering a collaborative learning
                        environment.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        {/* <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-center sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]"> */}
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h2>
              Let's explore how TeacherAssist can empower your school community:
            </h2>
            {/* Explore how TeacherAssist can empower your school community
          </h2> */}
            <p className="text-center py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Generate customized lesson plans in seconds.
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
            <h2 className="text-center lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Targeted Remedial Support
            </h2>
            <p className="text-center py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Automatic grading of homeworks using your phone's camera, while
              also providing personalized feedback to students.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-center lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Efficient Management Dashboards
            </h2>
            <p className="text-center py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Generate customized lesson plans in seconds.
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
            <h2 className="text-center lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Efficient Management Dashboards
            </h2>
            <p className="text-center py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Enhance LMS functionality with TeacherAssist's intuitive teacher
              dashboard. Empower educators to effortlessly track homework
              submissions, grades, and generate remedial assignments with a
              single click. By streamlining administrative tasks, our tool
              enables teachers to allocate more time to impactful teaching
              practices, ultimately driving academic success.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-center lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Fuel Your Business Growth with TeacherAssist
            </h2>
            <p className="text-center py-2 max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              With TeacherAssist as your ally, give AI wings to your LMS
              offerings. Drive differentiation, enhance customer satisfaction,
              and future-proof your business against industry shifts. By staying
              ahead of the curve with innovative solutions, you position your
              company as a leader in the education technology space, primed for
              sustained growth and success.
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
    </>
  );
}
