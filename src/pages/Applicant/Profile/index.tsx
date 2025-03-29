import {
  Badge,
  Button,
  Card,
  CardComp,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  TabsComp,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@dashflowx/core";
import { IoMdMail } from "react-icons/io";
import { LuDot, LuExternalLink } from "react-icons/lu";
import { Link } from "react-router-dom";

const profileData = {
  id: "sdmsds",
  name: "Sandeep Chiluvuri",
  designation: "Social Media Strategist",
  profileImageUrl:
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  about:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  match: "87.10% Match",
  skills: [
    {
      id: "we2wew4",
      name: "React",
    },
  ],
  portfolio: {
    url: "https://ui.shadcn.com/docs/components/drawer",
    name: "ui.shadcn.com",
  },
  appliedAt: "July 27, 2024",
  experience: "3.5",
  email: "Sandeep@gmail.com",
  phone: "1234567890",
  joiningPeriod: "Immediately",
  currentSalary: "2000 USD",
  expectedSalary: "2300 USD",
  timeZonePreference: "N/A",
  aiAssessmentScore: "81%",
  locatedAt: "USA",
  relocation: "No",
};
const ApplicantProfile = () => {
  return (
    <div className="max-w-screen-2xl mx-auto mt-6 flex gap-6">
      <div className="w-[30%] flex flex-col gap-3">
        <div className="flex flex-col gap-3 bg-white rounded-lg p-6">
          <div className="mr-2 aspect-square">
            <img
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              alt="profileImageUrl"
              className="w-full aspect-square rounded-full"
            />
          </div>
          <div className="min-w-0 flex-1 gap-3">
            <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {profileData.name}
            </h2>
            <p className="mt-2 text-md text-gray-800 dark:text-gray-400 w-fit flex items-center">
              {profileData.description}
            </p>
            <div>
              <p className="mt-2 text-md text-gray-800 dark:text-gray-400 w-fit flex items-center">
                {profileData.designation} <LuDot /> {profileData.locatedAt}
              </p>
            </div>
            <div className="mt-4">
              {profileData.skills.map((tag) => (
                <Badge
                  type="p"
                  variant="default"
                  textContent={tag.name}
                  className="mr-4 px-1 py-0 rounded-md w-fit"
                />
              ))}
            </div>
            <div className="mt-4">
              <Button variant="solid" color="primary" fullwidth={true}>
                Download CV
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-white rounded-lg p-3">
          <div className="min-w-0 flex-1">
            <h2 className="flex items-center text-2xl py-4 font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
              <LuDot className="text-primary" /> About Me
            </h2>
            <div className="bg-gray-50 p-4 rounded-t-lg flex flex-col gap-3">
              <p className="mt-1 text-md text-gray-800 dark:text-gray-400 w-fit flex items-center">
                {profileData.about}
              </p>
              <div className="h-[2px] mt-4 bg-gray-200"></div>
            </div>
            <div className="bg-gray-50 p-4 rounded-b-lg flex flex-col gap-3">
              <Link to={profileData.portfolio.url}>
                <Button
                  variant="ghost"
                  startIcon={<LuExternalLink />}
                  className="p-0"
                >
                  {profileData.portfolio.name}
                </Button>
              </Link>
              <Link to={profileData.portfolio.url}>
                <Button
                  variant="ghost"
                  startIcon={<IoMdMail />}
                  className="p-0"
                >
                  {profileData.email}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-white rounded-lg p-3">
          <div className="min-w-0 flex-1">
            <h2 className="flex items-center text-2xl py-4 font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
              <LuDot className="text-primary" /> Information
            </h2>
            <div className="bg-gray-50 px-4 rounded-t-lg flex flex-col gap-3">
              <div className="flex p-3 gap-3 justify-between">
                <p className="mt-1 text-md font-thin text-gray-800 dark:text-gray-400 w-fit flex items-center">
                  Location
                </p>
                <p className="mt-1 text-md text-gray-800 dark:text-gray-400 w-fit flex items-center">
                  {profileData.locatedAt}
                </p>
              </div>
              <div className="h-[2px] bg-gray-200"></div>
            </div>
            <div className="bg-gray-50 px-4 rounded-t-lg flex flex-col gap-3">
              <div className="flex p-3 gap-3 justify-between">
                <p className="mt-1 text-md font-thin text-gray-800 dark:text-gray-400 w-fit flex items-center">
                  Experience
                </p>
                <p className="mt-1 text-md text-gray-800 dark:text-gray-400 w-fit flex items-center">
                  {profileData.experience} years
                </p>
              </div>
              <div className="h-[2px] bg-gray-200"></div>
            </div>
            <div className="bg-gray-50 px-4 rounded-t-lg flex flex-col gap-3">
              <div className="flex p-3 gap-3 justify-between">
                <p className="mt-1 text-md font-thin text-gray-800 dark:text-gray-400 w-fit flex items-center">
                  Availability
                </p>
                <p className="mt-1 text-md text-gray-800 dark:text-gray-400 w-fit flex items-center">
                  {profileData.joiningPeriod}
                </p>
              </div>
              <div className="h-[2px] bg-gray-200"></div>
            </div>
            <div className="bg-gray-50 px-4 rounded-t-lg flex flex-col gap-3">
              <div className="flex p-3 gap-3 justify-between">
                <p className="mt-1 text-md font-thin text-gray-800 dark:text-gray-400 w-fit flex items-center">
                  Relocation
                </p>
                <p className="mt-1 text-md text-gray-800 dark:text-gray-400 w-fit flex items-center">
                  {profileData.relocation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[70%] p-3 pt-0 ">
        <TabsComp
          defaultValue="experience"
          className="w-full flex flex-col gap-3"
        >
          <TabsList className="grid w-full grid-cols-3 bg-white h-full ">
            <TabsTrigger value="experience" className="m-3 p-2">
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="m-3 p-2">
              Education
            </TabsTrigger>
            <TabsTrigger value="projects" className="m-3 p-2">
              Projects
            </TabsTrigger>
          </TabsList>
          <div className="p-3 bg-white">
            <TabsContent value="experience" className="flex flex-col gap-4">
              <CardComp className="bg-slate-50 shadow-none border-none">
                <CardHeader>
                  <CardTitle className="mb-4">Company Designation</CardTitle>
                  <CardDescription>
                    <div className="flex gap-3">
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 16v3h16v-3zm0-2h16V7H4zM9 3v2h6V3zm2 8h2v2h-2z"
                          ></path>
                        </svg>
                        Company Name
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="m12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9zM12 13a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                          ></path>
                        </svg>
                        Company Name
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zm-9 2v4H6v-4zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                          ></path>
                        </svg>
                        Company Name
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="w-full">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It
                    has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </div>
                </CardContent>
              </CardComp>
              <CardComp className="bg-slate-50 shadow-none border-none">
                <CardHeader>
                  <CardTitle className="mb-4">Company Designation</CardTitle>
                  <CardDescription>
                    <div className="flex gap-3">
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 16v3h16v-3zm0-2h16V7H4zM9 3v2h6V3zm2 8h2v2h-2z"
                          ></path>
                        </svg>
                        Company Name
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="m12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9zM12 13a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                          ></path>
                        </svg>
                        Company Location
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zm-9 2v4H6v-4zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                          ></path>
                        </svg>
                        Company Range
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="w-full">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It
                    has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </div>
                </CardContent>
              </CardComp>
              <CardComp className="bg-slate-50 shadow-none border-none">
                <CardHeader>
                  <CardTitle className="mb-4">Company Designation</CardTitle>
                  <CardDescription>
                    <div className="flex gap-3">
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 16v3h16v-3zm0-2h16V7H4zM9 3v2h6V3zm2 8h2v2h-2z"
                          ></path>
                        </svg>
                        Company Name
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="m12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9zM12 13a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                          ></path>
                        </svg>
                        Company Location
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zm-9 2v4H6v-4zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                          ></path>
                        </svg>
                        Company Period Range
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="w-full">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It
                    has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </div>
                </CardContent>
              </CardComp>
              <CardComp className="bg-slate-50 shadow-none border-none">
                <CardHeader>
                  <CardTitle className="mb-4">Company Designation</CardTitle>
                  <CardDescription>
                    <div className="flex gap-3">
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 16v3h16v-3zm0-2h16V7H4zM9 3v2h6V3zm2 8h2v2h-2z"
                          ></path>
                        </svg>
                        Company Name
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="m12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9zM12 13a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                          ></path>
                        </svg>
                        Company Location
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zm-9 2v4H6v-4zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                          ></path>
                        </svg>
                        Company Period Range
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="w-full">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It
                    has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </div>
                </CardContent>
              </CardComp>
              <CardComp className="bg-slate-50 shadow-none border-none">
                <CardHeader>
                  <CardTitle className="mb-4">Company Designation</CardTitle>
                  <CardDescription>
                    <div className="flex gap-3">
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 16v3h16v-3zm0-2h16V7H4zM9 3v2h6V3zm2 8h2v2h-2z"
                          ></path>
                        </svg>
                        Company Name
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="m12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9zM12 13a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                          ></path>
                        </svg>
                        Company Location
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zm-9 2v4H6v-4zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                          ></path>
                        </svg>
                        Company Period Range
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="w-full">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It
                    has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </div>
                </CardContent>
              </CardComp>
            </TabsContent>
            <TabsContent value="education" className="flex flex-col gap-4">
              <CardComp className="bg-slate-50 shadow-none border-none">
                <CardHeader>
                  <CardTitle className="mb-4">Educational Degree</CardTitle>
                  <CardDescription>
                    <div className="flex gap-3">
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 16v3h16v-3zm0-2h16V7H4zM9 3v2h6V3zm2 8h2v2h-2z"
                          ></path>
                        </svg>
                        Institute Name
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="m12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9zM12 13a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                          ></path>
                        </svg>
                        Institute Location
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zm-9 2v4H6v-4zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                          ></path>
                        </svg>
                        Institute Period Range
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="w-full">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It
                    has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </div>
                </CardContent>
              </CardComp>
              <CardComp className="bg-slate-50 shadow-none border-none">
                <CardHeader>
                  <CardTitle className="mb-4">Educational Degree</CardTitle>
                  <CardDescription>
                    <div className="flex gap-3">
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 16v3h16v-3zm0-2h16V7H4zM9 3v2h6V3zm2 8h2v2h-2z"
                          ></path>
                        </svg>
                        Institute Name
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="m12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9zM12 13a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                          ></path>
                        </svg>
                        Institute Location
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zm-9 2v4H6v-4zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                          ></path>
                        </svg>
                        Institute Period Range
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="w-full">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It
                    has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </div>
                </CardContent>
              </CardComp>
              <CardComp className="bg-slate-50 shadow-none border-none">
                <CardHeader>
                  <CardTitle className="mb-4">Educational Degree</CardTitle>
                  <CardDescription>
                    <div className="flex gap-3">
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 16v3h16v-3zm0-2h16V7H4zM9 3v2h6V3zm2 8h2v2h-2z"
                          ></path>
                        </svg>
                        Institute Name
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="m12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9zM12 13a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                          ></path>
                        </svg>
                        Institute Location
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zm-9 2v4H6v-4zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                          ></path>
                        </svg>
                        Institute Period Range
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="w-full">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It
                    has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </div>
                </CardContent>
              </CardComp>
            </TabsContent>
            <TabsContent value="projects" className="flex flex-col gap-4">
              <CardComp className="bg-slate-50 shadow-none border-none">
                <CardHeader>
                  <CardTitle className="mb-4">Project Name</CardTitle>
                  <CardDescription>
                    <div className="w-full">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. when an unknown printer took a
                      galley of type and scrambled it to make a type specimen
                      book. It has survived not only five centuries, but also
                      the leap into electronic typesetting, remaining
                      essentially unchanged.
                    </div>
                  </CardDescription>
                </CardHeader>
              </CardComp>
              <CardComp className="bg-slate-50 shadow-none border-none">
                <CardHeader>
                  <CardTitle className="mb-4">Project Name</CardTitle>
                  <CardDescription>
                    <div className="w-full">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. when an unknown printer took a
                      galley of type and scrambled it to make a type specimen
                      book. It has survived not only five centuries, but also
                      the leap into electronic typesetting, remaining
                      essentially unchanged.
                    </div>
                  </CardDescription>
                </CardHeader>
              </CardComp>
              <CardComp className="bg-slate-50 shadow-none border-none">
                <CardHeader>
                  <CardTitle className="mb-4">Project Name</CardTitle>
                  <CardDescription>
                    <div className="w-full">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. when an unknown printer took a
                      galley of type and scrambled it to make a type specimen
                      book. It has survived not only five centuries, but also
                      the leap into electronic typesetting, remaining
                      essentially unchanged.
                    </div>
                  </CardDescription>
                </CardHeader>
              </CardComp>
            </TabsContent>
          </div>
        </TabsComp>
      </div>
    </div>
  );
};

export default ApplicantProfile;
