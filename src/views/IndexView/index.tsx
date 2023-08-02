import { Container } from "@/components/Container";
import { LoadingPage } from "@/components/LoadingPage";
import { Header } from "@/components/MediaObject/Header";
import { useProjects } from "@/hooks/useProjects";
import Link from "next/link";

export const IndexView: React.FC = () => {
  const { data, isLoading } = useProjects({ query: { page: 1, limit: 10 } });

  if (!data || isLoading) return <LoadingPage />;

  return (
    <Container size="2xl" className="pt-8 space-y-8">
      <Header title={process.env.NEXT_PUBLIC_APP_NAME || "My Gallery"} size="5xl" />
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
    </Container>
  );
};
