import { Redirect } from "expo-router"
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import Feather from '@expo/vector-icons/Feather';

import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from "../themes/theme";
const Index = () => {

  const categories = [
    {
      id: 1,
      name: 'Watch'
    },
    {
      id: 2,
      name: 'iPhone'
    },
    {
      id: 3,
      name: 'iPad'
    },
     {
      id: 4,
      name: 'AirPods'
    },

  ]
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.headerLogo}>
            <Text></Text>
          </View>
          <Text style={styles.logoText}>Hi Jemmy</Text>
        </View>
        <View style={styles.bellContainer}>
          <Ionicons name="notifications-sharp" size={24} color={COLORS.primary} />
        </View>
      </View>
      <View style={styles.titleSearchBox}>
        <Text style={styles.title}>Find your product</Text>
        <View style={styles.searchBox}>
          <TextInput style={styles.searchInput} placeholder="Search your product" />
          <View style={styles.searchIconBox}>
            <Feather name="search" size={20} color={COLORS.white} />
          </View>
        </View>
      </View>

      <View style={styles.productBox}>
        <View style={styles.categoryBox}>

          <ScrollView
            style={styles.categoryScrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          // Style pour le contenu du ScrollView
          >
            {categories.map((categorie, index) => (
              <View style={styles.categoryTextContent} key={index}>
                <Text style={styles.categoryText}>{categorie.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.itemsBox}>
          <View style={styles.contentItemsScrollView}>

            <ScrollView horizontal={true}
              showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemsScrollView}>
              <View style={styles.scrollViewCard}>
                <View>
                  <Text>ImageItame</Text>
                </View>
                <View>
                  <Text>logo Apple</Text>
                  <Text>Apple watch 6</Text>

                  <Text>Description </Text>


                </View>
              </View>

              <View style={styles.scrollViewCard}>
                <View>
                  <Text>ImageItame</Text>
                </View>
                <View>
                  <Text>logo Apple</Text>
                  <Text>Apple watch 6</Text>

                  <Text>Description </Text>


                </View>
              </View>

              <View style={styles.scrollViewCard}>
                <View>
                  <Text>ImageItame</Text>
                </View>
                <View>
                  <Text>logo Apple</Text>
                  <Text>Apple watch 6</Text>

                  <Text>Description </Text>


                </View>
              </View>
            </ScrollView>
          </View>
{/* 
          <View style={styles.tabBarContent}>

          </View> */}

        </View>

      </View>

    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
    fontFamily: 'Poppins'
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },


  logoContainer: {
    // backgroundColor : 'red',

    width: 150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  headerLogo: {
    backgroundColor: COLORS.primary,
    height: 50,
    width: 50,
    borderRadius: 100
  },
  logoText: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: COLORS.primary
  },

  bellContainer: {
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    color: COLORS.primary
  },

  titleSearchBox: {
    marginTop: 20,
    height: 150,
    padding: 20,
  },

  title: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: 700
  },

  searchBox: {
    backgroundColor: COLORS.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 20
  },

  searchInput: {
    width: 50,
    height: '100%',
    borderStyle: 'solid',
    backgroundColor: COLORS.white,
    flex: 1,
    color: COLORS.secondary,
    fontWeight: 'bold'
  },

  searchIconBox: {
    backgroundColor: COLORS.primary,
    height: '100%',
    width: '11%',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },


  ///----------------- Product BOX ---------------//
  productBox: {
    flex: 2,

  },
  categoryBox: {
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 10
  },

  categoryScrollView: {
    flex: 1,
    overflow: 'scroll',
    width: '100%',


  },

  categoryTextContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    padding: 5,
    height: '100%',
    borderRadius: 100,
    width: 'auto'
  },

  categoryText: {
    color: COLORS.primary,
    paddingHorizontal: 10,
    fontSize: 20
  },
itemsBox: {
  flex: 1,
  // backgroundColor: 'red',
  width: '100%',
},

contentItemsScrollView: {
  flex: 1,
  // backgroundColor: 'red',
  paddingLeft: 20,
  paddingVertical: 20,
},

itemsScrollView: {
  // backgroundColor: 'green',
  gap: 20,
},

scrollViewCard: {
  backgroundColor: COLORS.white,
  borderRadius: 20,
  width: 210, 
  padding: 20, 
  
},

  tabBarContent: {
    backgroundColor: 'black',
    height: '15%'
  }

})