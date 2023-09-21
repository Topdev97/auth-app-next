"use client";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage({ params }: any) {
  const router = useRouter();
  // function to handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      console.error("Logout Failed", error);
      if (error.response && error.response.status === 400) {
        // Username or email already exists error
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else if (error.response && error.response.status === 500) {
        // Server error
        toast.error("An error occurred during Logout. Please try again later.");
      } else {
        // Generic error message
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Toaster />
      <section className="container p-6 text-center text-2xl flex flex-col   justify-center items-center h-[100vh]">
        <h1>Profile Page </h1>
        <hr />
        <br />
        <p className="text-2xl">
          {" "}
          <span className="p-3">id :</span> {params.id}{" "}
        </p>
        <br />
        <button className="bg-blue-500 p-3 rounded-md" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </>
  );
}
