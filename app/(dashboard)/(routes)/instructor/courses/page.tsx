"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const CoursesPage = () => {
  return (
    <div className="p-6">
      <Link href="/instructor/courses/create">
        <Button>Add New Course</Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
