import { Text, Button } from "react-native";
import BadgerCard from "./BadgerCard";

// Step 2: display chat messages
function BadgerChatMessage(props) {
    const dt = new Date(props.created);

    return <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
        <Text style={{ fontSize: 28, fontWeight: 600 }}>{props.title}</Text>
        <Text style={{ fontSize: 12 }}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
        <Text></Text>
        <Text>{props.content}</Text>
        <Text></Text>
        {/* Step 5: delete */}
        {props.poster === props.currUser && (
            <Button
                title="Delete"
                onPress={() => props.onDeletePost(props.id)}
                color="red"
            />
        )}
    </BadgerCard>
};

export default BadgerChatMessage;