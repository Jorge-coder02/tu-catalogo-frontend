import useUserMovies from "../hooks/useUserMovies";
import MovieCard from "../components/ui/MovieCard";

function UserDashboard() {
  const { viewedMovies, watchlistMovies } = useUserMovies();

  return (
    <div className="min-h-[calc(100dvh-64px)] pt-16 container mx-auto p-4">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4">Dashboard de Usuario</h1>
        <p className="text-gray-600">
          Aquí puedes gestionar tus vistas y pendientes.
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Tus Vistas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {viewedMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Tus Pendientes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {watchlistMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
