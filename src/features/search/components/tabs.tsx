import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';



export default function TabsComponent() {
    return (
        <Tabs
            value={currentTab}
            onValueChange={(value) => {
                setTabValue(value);
                setPage(1);
            }}
        >
            <TabsList className="w-full">
                <TabsTrigger value="movie">Movies</TabsTrigger>
                <TabsTrigger value="tv">TV Shows</TabsTrigger>
                <TabsTrigger value="person">Persons</TabsTrigger>
            </TabsList>
            <TabsContent
                value="movie"
                className="flex flex-wrap justify-center gap-5 my-5"
            >
                {!hasSearched
                    ? 'Write something and search'
                    : isPending
                      ? 'Loading...'
                      : movieElements.length > 0
                        ? movieElements.map((movie) => (
                              <Element key={movie.id} element={movie} />
                          ))
                        : 'There is no movie found with this query.'}
            </TabsContent>
            <TabsContent
                value="tv"
                className="flex flex-wrap justify-center gap-5 my-5"
            >
                {!hasSearched
                    ? 'Write something and search'
                    : isPending
                      ? 'Loading...'
                      : tvshowElements.length > 0
                        ? tvshowElements.map((tv) => (
                              <Element key={tv.id} element={tv} />
                          ))
                        : 'There is no tv show found with this query.'}
            </TabsContent>
            <TabsContent
                value="person"
                className="flex flex-wrap justify-center gap-5 my-5"
            >
                {!hasSearched
                    ? 'Write something and search'
                    : isPending
                      ? 'Loading...'
                      : personElements.length > 0
                        ? personElements.map((person) => (
                              <Element key={person.id} element={person} />
                          ))
                        : 'There is no person found with this query.'}
            </TabsContent>
        </Tabs>
    );
}
