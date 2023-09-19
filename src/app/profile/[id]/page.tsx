"use client";

export default function ProfilePage({ params }: any) {
  return (
    <section className="container p-6 text-center text-2xl flex justify-center items-center h-[100vh]">
      <h1>Profile Page </h1>
      <hr />
      <br />
      <p className="text-2xl">
        {" "}
        <span className="p-3">id :</span> {params.id}{" "}
      </p>
    </section>
  );
}
