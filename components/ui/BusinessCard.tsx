// components/ui/BusinessCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BusinessInterface } from '@/types/business';

interface BusinessCardProps {
  business: BusinessInterface;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const { theme } = useTheme();
  
  const handlePress = () => {
    // Navigate to business details and pass the business ID as params
    router.push({
      pathname: '/(app)/business-details/[id]',
      params: { id: business._id }
    });
  };
  
  return (
    <TouchableOpacity
      style={{
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: theme.background.paper,
        shadowColor: theme.common.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
      onPress={handlePress}
    >
      <View style={{
        flexDirection: 'row',
        padding: 12,
      }}>
        {/* Business Image */}
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          overflow: 'hidden',
          marginRight: 12,
          backgroundColor: theme.palette.grey[200],
        }}>
          {business.thumbnail ? (
            <Image
              source={{ uri: business.thumbnail }}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
          ) : (
            <View style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Ionicons
                name="business-outline"
                size={32}
                color={theme.palette.grey[400]}
              />
            </View>
          )}
        </View>
        
        {/* Business Info */}
        <View style={{
          flex: 1,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
          }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: theme.text.primary,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {business.businessName}
            </Text>
            {business.isVerified && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={theme.palette.primary.main}
                style={{
                  marginLeft: 4,
                }}
              />
            )}
          </View>
          
          {business.category && (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            }}>
              <Ionicons
                name="pricetag-outline"
                size={14}
                color={theme.text.secondary}
                style={{
                  marginRight: 4,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: theme.text.secondary,
                }}
                numberOfLines={1}
              >
                {business.category.name}
              </Text>
            </View>
          )}
          
          {business.location && (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            }}>
              <Ionicons
                name="location-outline"
                size={14}
                color={theme.text.secondary}
                style={{
                  marginRight: 4,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: theme.text.secondary,
                }}
                numberOfLines={1}
              >
                {[
                  business.location.city,
                  business.location.state,
                  business.location.country,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </Text>
            </View>
          )}
          
          {/* Rating */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Ionicons
              name="star"
              size={14}
              color={theme.warning.main}
              style={{
                marginRight: 4,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: theme.text.secondary,
                marginRight: 8,
              }}
            >
              {business.overalRating?.toFixed(1) || 'N/A'}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.text.disabled,
              }}
            >
              {business.reviews?.length || 0} reviews
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BusinessCard;