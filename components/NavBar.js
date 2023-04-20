import { useState } from "react";
import {
  AppBar,
  IconButton,
  Button,
  Avatar,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    return (
      // <AppBar
      //   title='hadplus'
      // />
      <AppBar
        style={{backgroundColor: '#c4c4c4', paddingLeft: '10%', paddingTop: '10%'}}
        title="hadplus"
        titleStyle={{color: 'black', fontWeight: 'bold'}}
        trailing={props =>
          loggedIn ? (
            <IconButton
              icon={<Avatar label="Ankush Yadav" size={28} />}
              onPress={() => setLoggedIn(!loggedIn)}
              {...props}
            />
          ) : (
            <Button
              variant="text"
              title="Login"
              compact
              style={{ marginEnd: 4, paddingRight: '10%' }}
              onPress={() => setLoggedIn(!loggedIn)}
              {...props}
            />
          )
        }
      />
    );
  };
  
  export default NavBar;