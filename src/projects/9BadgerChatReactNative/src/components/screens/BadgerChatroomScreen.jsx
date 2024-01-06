import { StyleSheet, Text, TextInput, View, Button, ScrollView, Modal, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import BadgerChatMessage from "../helper/BadgerChatMessage";

function BadgerChatroomScreen(props) {

    // Step 2: display chat messages
    const [messages, setMessages] = useState([]);

    // Step 3: pagination
    const [currentPage, setCurrentPage] = useState(1);

    // Step 4: add post
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");

    const fetchMessages = async () => {
        try {
            const response = await fetch(
                `https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}&page=${currentPage}`,
                {
                    headers: {
                        "X-CS571-ID": "bid_c6d49d6dc0151ad7874971c6ccdddad3913bad5b559fbc6a649bed932a5d0d5a",
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                const data = await response.json();
                setMessages(data.messages || []);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchMessages(); // refresh page
    }, [props.name, currentPage]);

    // Step 3: pagination
    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, 4));
    };

    // Step 3: pagination
    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    // Step 4: add post
    const handleAddPost = () => {
        setIsModalVisible(true);
    };

    // Step 4: add post
    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    // Step 4: add post
    const handlePostSubmit = async () => {
        fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}`, {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_c6d49d6dc0151ad7874971c6ccdddad3913bad5b559fbc6a649bed932a5d0d5a",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token,
            },
            body: JSON.stringify({
                "title": newPostTitle,
                "content": newPostContent,
            })
        }).then(res => {
            if (res.status === 200) {
                Alert.alert("Succesfully posted!", "Succesfully posted!");
                setCurrentPage(1); // reset to 1st page
                fetchMessages(); // refresh page
                return res.json();
            } else if (res.status === 401) {
                Alert.alert("You must be logged in to post!");
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
        })
        setNewPostTitle("");
        setNewPostContent("");
        setIsModalVisible(false);
    };

    // Step 5: delete post
    const handleDeletePost = async (id) => {
        try {
            const response = await fetch(`https://cs571.org/api/f23/hw9/messages/?id=${id}`, {
                method: "DELETE",
                headers: {
                    "X-CS571-ID": "bid_c6d49d6dc0151ad7874971c6ccdddad3913bad5b559fbc6a649bed932a5d0d5a",
                    "Authorization": "Bearer " + props.token,
                },
            })
                .then(res => {
                    if (res.status === 200) {
                        Alert.alert("Alert", "Successfully deleted the post!");
                        setCurrentPage(1); // reset to 1st page
                        fetchMessages(); // refresh page
                    }
                })
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
            {/* Step 2: map messages to screen */}
            {messages.map(message => (
                <View key={message.id}>
                    <BadgerChatMessage
                        key={message.id}
                        id={message.id}
                        title={message.title}
                        poster={message.poster}
                        created={message.created}
                        content={message.content}
                        currUser={props.username} // for step 5
                        onDeletePost={handleDeletePost}
                    />
                </View>
            ))}
        </ScrollView>

        <View style={styles.footer}>
            {/* Step 3: pagination */}
            <View style={styles.pagination} >
                <Button title="Previous Page" onPress={handlePrevPage} disabled={currentPage === 1} />
                <Text style={{ marginHorizontal: 10 }}>Page {currentPage}</Text>
                <Button title="Next Page" onPress={handleNextPage} disabled={currentPage === 4} />
            </View>

            {/* Step 4: add post */}
            {!props.isGuest && (
                <View>
                    <Button title="Add Post" onPress={handleAddPost} />
                </View>
            )}

            {/* Step 4: add post modal */}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 18 }}>Create a Post</Text>
                        <Text>Title</Text>
                        <TextInput
                            style={styles.input}
                            value={newPostTitle}
                            onChangeText={(text) => setNewPostTitle(text)}
                        />
                        <Text>Content</Text>
                        <TextInput
                            style={styles.input}
                            value={newPostContent}
                            onChangeText={(text) => setNewPostContent(text)}
                            multiline={true}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Cancel" onPress={handleModalClose} color="red" />
                            <Button
                                title="Submit"
                                onPress={handlePostSubmit}
                                disabled={!newPostTitle || !newPostContent}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    </View >
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '80%',
        padding: 15,
        borderRadius: 10,
    },
    input: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default BadgerChatroomScreen;