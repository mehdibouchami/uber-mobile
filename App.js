import React from 'react';
import AppLoading from 'expo-app-loading';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Title, Right } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Users from "./components/Users";
import Maps from "./components/Maps";



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      active: "users"
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            {
              {
                'users': <Title>Users</Title>,
                'camera': <Title>camera</Title>
              }[this.state.active]
            }
          </Body>
          <Right />
        </Header>
        <Content>
          {
            {
              'users': <Users />,
              'camera': <Maps />
            }[this.state.active]
          }
          </Content>
          <Footer>
            <FooterTab>
              {(this.state.active === "users") ?
                <Button vertical active>
                  <Icon name="person" />
                  <Text>Users</Text>
                </Button>
                :
                <Button vertical onPress={() => this.setState({ active: 'users' })}>
                  <Icon name="person" />
                  <Text>Users</Text>
                </Button>
              }
              {(this.state.active === "camera") ?
                <Button vertical active>
                  <Icon name="camera" />
                  <Text>Camera</Text>
                </Button>
                :
                <Button vertical onPress={() => this.setState({ active: 'camera' })}>
                  <Icon name="camera" />
                  <Text>Camera</Text>
                </Button>
              }

            </FooterTab>
          </Footer>
    </Container>
    );
  }
}
