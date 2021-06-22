import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { useQuery, gql } from "@apollo/client";

const YELP_QUERY = gql`
  {
    search(location: "Santiago ", term: " ") {
      business {
        name
        id
        photos
        hours {
          hours_type
          is_open_now
        }
        review_count
        location {
          address1
        }
        url
        phone
        reviews {
          rating
          text
        }
        categories {
          title
        }
        price
        rating
      }
    }
  }
`;

export const YelpView = () => {
  const { data, loading, error } = useQuery(YELP_QUERY);

  if (loading || error) return null;

  return (
    <ScrollView style={{ marginTop: 50 }}>
      {data?.search.business.map((item: any) => {
        return (
          <View key={item.id} style={{ margin: 20 }}>
            <Text>{item.name}</Text>
            <Text>{item.rating}</Text>
            <Image
              source={{ uri: item.photos[0] }}
              style={{ height: 200, width: "100%" }}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
