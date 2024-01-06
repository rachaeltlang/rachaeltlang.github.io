import { ScrollView, Text } from "react-native";
import { useState, useEffect, useContext } from "react";
import BadgerNewsItemCard from "../navigation/BadgerNewsItemCard";
import PreferencesContext from "../PreferencesContext";

function BadgerNewsScreen() {
    const [news, setNews] = useState([]);
    const { preferences } = useContext(PreferencesContext);

    const filterArticles = (article) => {
        // Check if at least one tag is toggled on
        return article.tags.some((tag) => preferences[tag]);
    };

    // Step 2: fetch data
    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw8/articles", {
            headers: {
                "X-CS571-ID": "bid_c6d49d6dc0151ad7874971c6ccdddad3913bad5b559fbc6a649bed932a5d0d5a"
            }
        })
            .then(res => res.json())
            .then(data => {
                setNews(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            })
    }, []);

    // Step 4: filtered articles to display
    const filteredArticles = news.filter(filterArticles);

    return (
        <ScrollView>
            {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                    <BadgerNewsItemCard key={article.id} {...article} />
                ))
            ) : (
                // Step 4: display message if there are no articles to show
                <Text>No articles match the selected preferences.</Text>
            )}
        </ScrollView>
    )
}

export default BadgerNewsScreen;
