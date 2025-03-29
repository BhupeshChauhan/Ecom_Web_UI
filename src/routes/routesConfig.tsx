/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// routes.ts
import React, { Suspense } from "react";
import AuthGard from "./AuthGard";
import Loader from "../components/Loader";
import ErrorPage from "../pages/ErrorPage";
import InterviewCompletedView from "../pages/Applicant/Job/InterviewCompletedView";
import ActiveClientUsers from "../pages/Users/Users/ActiveUsers";
import DeactivatedClientUsers from "../pages/Users/Users/DeactivatedUsers";
import ChangePasswordPage from "../pages/Auth/ChangePasswordPage";
import AuthEmailPage from "../pages/Auth/AuthEmailPage";
import ApplicantDetails from "../pages/Users/Job/ApplicantDetails";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import PreviewJobApplicant from "../pages/Applicant/Job/PreviewJob";
import JobsList from "../pages/Users/Job/JobsList";
import ApplicantsList from "../pages/Users/Job/ApplicantsList";
import Plans from "../pages/Plans";
import CandidateList from "../pages/Users/Candidate/CandidateList";
import EditCandidateDetails from "../pages/Users/Candidate/EditCandidateDetails";
import Admin from "../pages/Users/Admin";
import QBSingle from "../components/QuestionBank/QBSingle";

// Layout
const Layout = React.lazy(() => import("../layout"));

// Error Pages Routes
const NotFound = React.lazy(() => import("../pages/NotFoundPage"));

// Auth Pages Routes
const SigninPage = React.lazy(() => import("../pages/Auth/SignInPage"));
const SignUpPage = React.lazy(() => import("../pages/Auth/SignUpPage"));
const ForgotPasswordPage = React.lazy(
  () => import("../pages/Auth/ForgotPasswordPage"),
);

// Applicant Pages Routes
const SingleJobView = React.lazy(
  () => import("../pages/Applicant/Job/SingleJobView"),
);
const ApplicantProfile = React.lazy(() => import("../pages/Applicant/Profile"));

// Client Pages Routes
const ClientDashboard = React.lazy(() => import("../pages/Users/Dashboard"));
const ClientPolicies = React.lazy(() => import("../pages/Users/Policies"));
const ClientGeneralSettings = React.lazy(
  () => import("../pages/Users/Settings"),
);
const ClientUsers = React.lazy(() => import("../pages/Users/Users"));
const CreateJob = React.lazy(() => import("../pages/Users/Job/CreateJob"));
const EditJob = React.lazy(() => import("../pages/Users/Job/EditJob"));
// const JobAssissment = React.lazy(() => import("../pages/Users/Assissment"));
const JobAssessment = React.lazy(() => import("../pages/Users/Assessment"));
const AddScreeningQues = React.lazy(
  () => import("../pages/Users/Job/ScreeningQues"),
);
const VideoScreening = React.lazy(
  () => import("../pages/Applicant/Job/VideoScreening"),
);
const PreviewJob = React.lazy(() => import("../pages/Users/Job/PreviewJob"));
const HmDashboard = React.lazy(
  () => import("../pages/Users/Dashboard/HmDashboard"),
);
const HrmDashboard = React.lazy(
  () => import("../pages/Users/Dashboard/HrmDashboard"),
);
const HrpDashboard = React.lazy(
  () => import("../pages/Users/Dashboard/HrpDashboard"),
);

interface RouteConfig {
  path?: any;
  element: any;
  children?: any;
  errorElement?: any;
}

const routes: RouteConfig[] = [
  {
    // Auth route component
    element: (
      <Suspense fallback={<Loader />}>
        <AuthGard type="unAuthorized">
          <Layout type="mini" />
        </AuthGard>
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
    // child route components
    children: [
      { path: "/", element: <SigninPage /> },
      { path: "/sign-in", element: <SigninPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/verify-email", element: <VerifyEmail /> },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage type="user" />,
      },
      {
        path: "/auth",
        element: <AuthEmailPage />,
      },
    ],
  },
  {
    // Applicant Pages Routes
    element: (
      <Suspense fallback={<Loader />}>
        <AuthGard type="noAuth">
          <Layout type="mini" />
        </AuthGard>
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
    // child route components
    children: [
      { path: "/applicant/profile/:id", element: <ApplicantProfile /> },
      {
        path: "/applicant/jobs/:id",
        element: <PreviewJobApplicant />,
      },
      { path: "/applicant/jobs/screening/:id", element: <SingleJobView /> },
      {
        path: "/applicant/jobs/screening/:id/interview",
        element: <VideoScreening />,
      },
      {
        path: "/applicant/jobs/screening/:id/completedInterview",
        element: <InterviewCompletedView />,
      },
    ],
  },
  {
    // Client Pages Routes
    element: (
      <Suspense fallback={<Loader />}>
        <AuthGard type="client">
          <Layout type="client" />
        </AuthGard>
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
    // child route components
    children: [
      { path: "/dashboard", element: <ClientDashboard /> },
      { path: "/hrm/dashboard", element: <HrmDashboard /> },
      { path: "/hrp/dashboard", element: <HrpDashboard /> },
      { path: "/hm/dashboard", element: <HmDashboard /> },
      { path: "/jobs", element: <JobsList /> },
      { path: "/jobs/edit/:id", element: <EditJob /> },
      {
        path: "/jobs/jobdetails/:id/assessment/report/:interviewId/:applicantId",
        element: <JobAssessment />,
      },
      { path: "/jobs/create", element: <CreateJob /> },
      {
        path: "/jobs/jobdetails/:id",
        element: <ApplicantsList showHeader={true} />,
      },
      {
        path: "/jobs/:id/applicant/edit/:applicantId",
        element: <ApplicantDetails />,
      },

      { path: "/candidates", element: <CandidateList /> },
      { path: "/candidates/:id", element: <EditCandidateDetails /> },
      { path: "/policies", element: <ClientPolicies /> },
      { path: "/billing", element: <Plans /> },
      { path: "/users", element: <ClientUsers /> },
      { path: "/users/active", element: <ActiveClientUsers /> },
      { path: "/users/deactivated", element: <DeactivatedClientUsers /> },
      { path: "/jobs/screeningques/:id", element: <AddScreeningQues /> },
      {
        path: "/jobs/preview/:id",
        element: <PreviewJob type="view" />,
      },
      {
        path: "/change-password",
        element: <ChangePasswordPage />,
      },
    ],
  },
  {
    // Client Pages Routes
    element: (
      <Suspense fallback={<Loader />}>
        <AuthGard type="client">
          <Layout type="client" />
        </AuthGard>
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
    // child route components
    children: [
      { path: "/settings", element: <ClientGeneralSettings /> },
      { path: "/settings/users", element: <Admin /> },
      { path: "/settings/billing", element: <Admin /> },
      { path: "/settings/organization", element: <Admin /> },
        { path: "/settings/question-bank", element: <Admin /> },
        { path: "/settings/question-bank/:id", element: <QBSingle /> },
        { path: "/settings/ai-assessment-config", element: <Admin /> },

    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
