import { Text, View, Image, ActivityIndicator, FlatList } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import useFetch from "../../services/useFetch";
import { fetchMovies } from "../../services/api";
import MovieCard from "@/components/MovieCard";
import React from "react";
import { updateSearchCount } from "@/services/firebase";

const search = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const { 
    data: movies, 
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ 
      query: searchQuery 
    }), false); 

    useEffect(() => {

      const timeoutId = setTimeout(async () => {
        if (searchQuery.trim()) {
          const fetchedMovies = await loadMovies();
          console.log('Updating search count for:', searchQuery, fetchedMovies?.[0]);

          if (fetchedMovies?.length > 0 ){
            await updateSearchCount(searchQuery, fetchedMovies[0]);
          }
        } else {
          reset();
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }, [searchQuery]);

  return (
    <View className='flex-1'>
      <Image 
        source={require('../../assets/images/movie_background.webp')}
        // resizeMode="cover"
        className="absolute w-full z-0 h-full"
      />

      <FlatList 
        data={movies}
        renderItem={({ item }) => (
          <MovieCard 
            {...item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'center', gap: 16,marginVertical: 16 }}
        contentContainerStyle={{paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={require('../../assets/images/movie_logo_nbg.png')} className="w-20 h-20 mb-5 mx-auto"/>
            </View>
            <View className="my-5">
              <SearchBar 
                placeholder="Search movies, TV shows..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator size="large" color="#ffffff" className="my-3"/>
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Results for{' '}
                <Text className="text-accent">&quot;{searchQuery}&quot;</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? 'No movies found...' : 'Search for a movie...'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default search