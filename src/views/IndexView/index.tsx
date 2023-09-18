import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Header } from "@/components/MediaObject/Header";
import { Spin } from "@/components/Spin";
import { useProjects } from "@/hooks/useProjects";
import Link from "next/link";
import { useState } from "react";

export const IndexView: React.FC = () => {
  const { data, isLoading } = useProjects({ query: { page: 1, limit: 20 } });

  return (
    <Container size="2xl" className="pt-8 space-y-8">
      <Header
        title={process.env.NEXT_PUBLIC_APP_NAME || "My Gallery"}
        size="5xl"
      />

      {!data || isLoading ? (
        <div className="flex justify-center py-4">
          <Spin />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1">
          {data?.results.map((project) => (
            <Link
              key={project.id}
              href={`/${project.id}`}
              className="relative pb-[100%] rounded-md overflow-hidden hover:opacity-50"
            >
              <img
                className="absolute h-full w-full object-cover"
                src={project.image}
              />
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
};
