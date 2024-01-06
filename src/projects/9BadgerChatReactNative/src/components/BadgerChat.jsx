import { useEffect, useState } from 'react';
import { Alert } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';

const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // step 1
  const [isRegistering, setIsRegistering] = useState(false); // step 1
  const [chatrooms, setChatrooms] = useState(["Logout"]); // step 6: initialize chatrooms to include Logout
  const [token, setToken] = useState(null); // step 1
  const [username, setUsername] = useState(null); // step 5
  const [isGuest, setIsGuest] = useState(false); // step 7

  // Step 2: display chatrooms
  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw9/chatrooms", {
      headers: {
        "X-CS571-ID": "bid_c6d49d6dc0151ad7874971c6ccdddad3913bad5b559fbc6a649bed932a5d0d5a",
        "Content-Type": "application/json",
      },
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
    }).then(data => {
      // display chatrooms in sidebar
      setChatrooms(prevChatrooms => [...data, ...prevChatrooms]);
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }, []);

  // Step 1: login
  function handleLogin(username, password) {
    setUsername(username); // step 5: set username to pass down to ChatroomScreen to pass down to ChatMessage for delete button
    if (username === "" || password === "") {
      Alert.alert("Please enter both a username and password");
    }
    fetch("https://cs571.org/api/f23/hw9/login", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_c6d49d6dc0151ad7874971c6ccdddad3913bad5b559fbc6a649bed932a5d0d5a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
      }),
    }).then(res => {
      if (res.status === 200) {
        setIsLoggedIn(true);
        return res.json();
      } else if (res.status === 401) {
        alert("The username or password is incorrect");
      }
    }).then(data => {
      if (data && data.token) {
        storeToken(data.token);
      }
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  };

  // Step 1: register
  function handleSignup(username, password, confirmPassword) {
    if (username === "" || password === "") {
      Alert.alert("Please enter both a username and password");
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match", "Please check that the passwords match");
    } else {
      fetch("https://cs571.org/api/f23/hw9/register", {
        method: "POST",
        headers: {
          "X-CS571-ID": "bid_c6d49d6dc0151ad7874971c6ccdddad3913bad5b559fbc6a649bed932a5d0d5a",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": username,
          "password": password,
        }),
      }).then(res => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          return res.json();
        } else if (res.status === 409) {
          alert("That username is already taken");
        }
      }).catch(error => {
        console.error("Error fetching data:", error);
      })
    }
  };

  // Step 1: store JWT
  const storeToken = async (token) => {
    try {
      await SecureStore.setItemAsync("jwtToken", token);
      setToken(token);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };

  // Step 7: guest login
  const loginAsGuest = () => {
    setIsLoggedIn(true);
    setIsGuest(true);
  };

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {chatrooms.map((chatroom) => (
            <ChatDrawer.Screen
              key={chatroom}
              name={chatroom}
              options={{
                drawerLabel: chatroom === "Logout" ? "Logout" : chatroom,
              }}
            >
              {(props) =>
                chatroom === "Logout" ? (
                  <BadgerLogoutScreen
                    setIsLoggedIn={setIsLoggedIn}
                    setIsRegistering={setIsRegistering}
                    isGuest={isGuest}
                    {...props} />
                ) : (
                  <BadgerChatroomScreen
                    name={chatroom}
                    token={token}
                    username={username}
                    isGuest={isGuest}
                    {...props} />
                )
              }
            </ChatDrawer.Screen>
          ))}
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen
      handleSignup={handleSignup}
      setIsRegistering={setIsRegistering} />;
  } else {
    return <BadgerLoginScreen
      handleLogin={handleLogin}
      setIsRegistering={setIsRegistering}
      setIsLoggedIn={setIsLoggedIn}
      loginAsGuest={loginAsGuest} />;
  }
}