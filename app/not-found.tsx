import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-gray-50 items-center justify-center h-screen">
      <Breadcrumb pageName="404! Not Found" />
      <ErrorPage message="Sorry, we can't find that page. You'll find lots to explore on the home page." />
    </div>
  );
}
