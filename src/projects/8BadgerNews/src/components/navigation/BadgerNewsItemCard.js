import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function BadgerNewsItemCard(props) {
    const navigation = useNavigation();

    const readArticle = () => {
        navigation.push("Article", {
            title: props.title,
            id: props.id,
            img: props.img,
            fullArticleId: props.fullArticleId,
        });
    };

    {/* Step 2: BadgerNewsItemCard component */ }
    return (
        <TouchableOpacity onPress={readArticle}>
            <View style={styles.card}>
                <Image
                    style={styles.image}
                    source={{ uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${props.img}` }}
                />
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 16,
    },
});

export default BadgerNewsItemCard;