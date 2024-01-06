import { useState, useEffect, useRef } from "react";
import { Text, Image, Animated, StyleSheet, Pressable, Linking } from "react-native";

function BadgerNewsArticle(props) {
    const details = props.route.params;
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const fade = useRef(new Animated.Value(0)).current;

    // Step 3: fetch details for specific article
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://cs571.org/api/f23/hw8/article?id=${details.fullArticleId}`, {
                    headers: {
                        "X-CS571-ID": "bid_c6d49d6dc0151ad7874971c6ccdddad3913bad5b559fbc6a649bed932a5d0d5a"
                    }
                });
                const data = await response.json();
                setArticle(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [details.fullArticleId]);

    useEffect(() => {
        if (!loading) {
            Animated.timing(fade, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();
        }
    }, [loading, fade]);


    const styles = StyleSheet.create({
        image: {
            width: "100%",
            height: 300,
            resizeMode: 'cover',
            marginBottom: 8,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 8,
        },
        text: {
            fontSize: 16,
            lineHeight: 24,
        },
        link: {
            color: 'blue',
            textDecorationLine: 'underline',
            marginBottom: 8,
        }
    });

    // Step 5: link to news.wisc.edu
    const goToLink = () => {
        Linking.openURL(article.url)
    };

    // Step 3: display article
    return (
        <>
            {loading && <Text style={styles.loadingText}>Loading...</Text>}
            <Animated.View style={{ opacity: fade }}>
                {!loading && (
                    <>
                        <Image
                            style={styles.image}
                            source={{ uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${article.img}` }}
                        />
                        <Text style={styles.title}>{article.title}</Text>
                        <Text style={styles.text}>By {article.author} on {article.posted}</Text>
                        <Pressable onPress={goToLink}>
                            <Text style={styles.link}>Read full article here</Text>
                        </Pressable>
                        <Text>{article.body}</Text>
                    </>
                )}
            </Animated.View>
        </>
    )
}

export default BadgerNewsArticle;