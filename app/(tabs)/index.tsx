import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "../../services/useFetch";
import { fetchMovies } from "../../services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError } = useFetch(() => fetchMovies({ 
      query: '' 
    })); 
  
  return (
    <View className="flex-1 justify-center items-center">
      <Image 
        source={require('../../assets/images/movie_background.webp')}
        // resizeMode="cover"
        className="absolute w-full z-0 h-full"
      />
      <ScrollView className="flex-1 w-full px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}> 
        <Image source={require('../../assets/images/movie_logo_nbg.png')} className="w-20 h-20 mt-20 mb-5 mx-auto"/>

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-red-500 text-center">Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar 
              onPress={() => router.push('/search')}
              placeholder="Search movies, TV shows..."
            />

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard 
                    {...item}
                  />
                  
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'flex-start', gap: 20, marginBottom: 10, paddingRight: 5 }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />  
            </>
        </View>
        )}

      </ScrollView>
      
    </View>
  );
}