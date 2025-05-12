import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import { useTheme } from '@/theme';
import { useSearch } from '@/contexts/search';
import { Ionicons } from '@expo/vector-icons';
import { useCategory } from '@/contexts/categories/fetch';
import { SearchParams } from '@/api/search';

const FilterPanel = () => {
  const { theme } = useTheme();
  const { filters, setFilters, resetFilters, executeSearch } = useSearch();
  const { allCategories } = useCategory();
  
  // Local state for filter values
  const [localFilters, setLocalFilters] = useState<SearchParams>({ ...filters });
  
  // Update local filters when main filters change
  useEffect(() => {
    setLocalFilters({ ...filters });
  }, [filters]);
  
  // Handle filter changes
  const handleFilterChange = (key: keyof SearchParams, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };
  
  // Apply filters
  const applyFilters = () => {
    setFilters(localFilters);
    executeSearch();
  };
  
  // Reset filters
  const handleResetFilters = () => {
    resetFilters();
    setLocalFilters({ ...filters });
  };
  
  return (
    <View 
      style={{
        backgroundColor: theme.background.paper,
        borderColor: theme.divider,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
      }}
    >
      <ScrollView 
        style={{
          maxHeight: 400,
        }}
      >
        {/* Location Filters */}
        <View style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.divider,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 12,
            color: theme.text.primary,
          }}>
            Location
          </Text>
          <View style={{
            marginBottom: 12,
          }}>
            <Text style={{
              fontSize: 14,
              marginBottom: 4,
              color: theme.text.secondary,
            }}>
              City
            </Text>
            <TextInput
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: theme.divider,
                borderRadius: 4,
                paddingHorizontal: 12,
                backgroundColor: theme.background.default,
                color: theme.text.primary,
              }}
              value={localFilters.city}
              onChangeText={(text) => handleFilterChange('city', text)}
              placeholder="Enter city"
              placeholderTextColor={theme.text.disabled}
            />
          </View>
          
          <View style={{
            marginBottom: 12,
          }}>
            <Text style={{
              fontSize: 14,
              marginBottom: 4,
              color: theme.text.secondary,
            }}>
              State/Province
            </Text>
            <TextInput
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: theme.divider,
                borderRadius: 4,
                paddingHorizontal: 12,
                backgroundColor: theme.background.default,
                color: theme.text.primary,
              }}
              value={localFilters.state}
              onChangeText={(text) => handleFilterChange('state', text)}
              placeholder="Enter state/province"
              placeholderTextColor={theme.text.disabled}
            />
          </View>
          
          <View style={{
            marginBottom: 4,
          }}>
            <Text style={{
              fontSize: 14,
              marginBottom: 4,
              color: theme.text.secondary,
            }}>
              Country
            </Text>
            <TextInput
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: theme.divider,
                borderRadius: 4,
                paddingHorizontal: 12,
                backgroundColor: theme.background.default,
                color: theme.text.primary,
              }}
              value={localFilters.country}
              onChangeText={(text) => handleFilterChange('country', text)}
              placeholder="Enter country"
              placeholderTextColor={theme.text.disabled}
            />
          </View>
        </View>
        
        {/* Category Filter */}
        <View style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.divider,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 12,
            color: theme.text.primary,
          }}>
            Category
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{
              marginBottom: 8,
            }}
            contentContainerStyle={{
              paddingRight: 16,
            }}
          >
            {allCategories?.map((category) => (
              <TouchableOpacity
                key={category._id}
                style={{
                  backgroundColor: 
                    localFilters.category === category.name
                      ? theme.palette.primary.main
                      : theme.background.default,
                  borderColor: theme.divider,
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  marginRight: 8,
                }}
                onPress={() => 
                  handleFilterChange(
                    'category', 
                    localFilters.category === category.name ? undefined : category.name
                  )
                }
              >
                <Text
                  style={{
                    color: 
                      localFilters.category === category.name
                        ? theme.palette.primary.contrastText
                        : theme.text.primary,
                    fontSize: 14,
                  }}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Status Filters */}
        <View style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.divider,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 12,
            color: theme.text.primary,
          }}>
            Status
          </Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Text style={{
              fontSize: 14,
              color: theme.text.primary,
            }}>
              Verified businesses only
            </Text>
            <Switch
              value={localFilters.isVerified === true}
              onValueChange={(value) => 
                handleFilterChange('isVerified', value ? true : undefined)
              }
              trackColor={{ 
                false: theme.palette.grey[400], 
                true: theme.palette.primary.main 
              }}
              thumbColor={theme.palette.common.white}
            />
          </View>
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 14,
              color: theme.text.primary,
            }}>
              Currently open
            </Text>
            <Switch
              value={localFilters.isOpen === true}
              onValueChange={(value) => 
                handleFilterChange('isOpen', value ? true : undefined)
              }
              trackColor={{ 
                false: theme.palette.grey[400], 
                true: theme.palette.primary.main 
              }}
              thumbColor={theme.palette.common.white}
            />
          </View>
        </View>
        
        {/* Sort Options */}
        <View style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.divider,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 12,
            color: theme.text.primary,
          }}>
            Sort By
          </Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -4,
          }}>
            <TouchableOpacity
              style={{
                backgroundColor: 
                  localFilters.sortBy === 'name'
                    ? theme.palette.primary.main
                    : theme.background.default,
                borderColor: theme.divider,
                borderWidth: 1,
                borderRadius: 4,
                paddingHorizontal: 12,
                paddingVertical: 8,
                margin: 4,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                const newOrder = 
                  localFilters.sortBy === 'name' && localFilters.sortOrder === 'asc'
                    ? 'desc'
                    : 'asc';
                handleFilterChange('sortBy', 'name');
                handleFilterChange('sortOrder', newOrder);
              }}
            >
              <Text
                style={{
                  color: 
                    localFilters.sortBy === 'name'
                      ? theme.palette.primary.contrastText
                      : theme.text.primary,
                  fontSize: 14,
                  marginRight: 4,
                }}
              >
                Name
              </Text>
              {localFilters.sortBy === 'name' && (
                <Ionicons
                  name={
                    localFilters.sortOrder === 'asc'
                      ? 'arrow-up-outline'
                      : 'arrow-down-outline'
                  }
                  size={16}
                  color={theme.palette.primary.contrastText}
                />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: 
                  localFilters.sortBy === 'date'
                    ? theme.palette.primary.main
                    : theme.background.default,
                borderColor: theme.divider,
                borderWidth: 1,
                borderRadius: 4,
                paddingHorizontal: 12,
                paddingVertical: 8,
                margin: 4,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                const newOrder = 
                  localFilters.sortBy === 'date' && localFilters.sortOrder === 'desc'
                    ? 'asc'
                    : 'desc';
                handleFilterChange('sortBy', 'date');
                handleFilterChange('sortOrder', newOrder);
              }}
            >
              <Text
                style={{
                  color: 
                    localFilters.sortBy === 'date'
                      ? theme.palette.primary.contrastText
                      : theme.text.primary,
                  fontSize: 14,
                  marginRight: 4,
                }}
              >
                Date
              </Text>
              {localFilters.sortBy === 'date' && (
                <Ionicons
                  name={
                    localFilters.sortOrder === 'asc'
                      ? 'arrow-up-outline'
                      : 'arrow-down-outline'
                  }
                  size={16}
                  color={theme.palette.primary.contrastText}
                />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: 
                  localFilters.sortBy === 'rating'
                    ? theme.palette.primary.main
                    : theme.background.default,
                borderColor: theme.divider,
                borderWidth: 1,
                borderRadius: 4,
                paddingHorizontal: 12,
                paddingVertical: 8,
                margin: 4,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                const newOrder = 
                  localFilters.sortBy === 'rating' && localFilters.sortOrder === 'desc'
                    ? 'asc'
                    : 'desc';
                handleFilterChange('sortBy', 'rating');
                handleFilterChange('sortOrder', newOrder);
              }}
            >
              <Text
                style={{
                  color: 
                    localFilters.sortBy === 'rating'
                      ? theme.palette.primary.contrastText
                      : theme.text.primary,
                  fontSize: 14,
                  marginRight: 4,
                }}
              >
                Rating
              </Text>
              {localFilters.sortBy === 'rating' && (
                <Ionicons
                  name={
                    localFilters.sortOrder === 'asc'
                      ? 'arrow-up-outline'
                      : 'arrow-down-outline'
                  }
                  size={16}
                  color={theme.palette.primary.contrastText}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Results per page */}
        <View style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.divider,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 12,
            color: theme.text.primary,
          }}>
            Results per page
          </Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -4,
          }}>
            {[10, 20, 50].map((pageSize) => (
              <TouchableOpacity
                key={`page-${pageSize}`}
                style={{
                  backgroundColor: 
                    localFilters.pageLimit === pageSize
                      ? theme.palette.primary.main
                      : theme.background.default,
                  borderColor: theme.divider,
                  borderWidth: 1,
                  borderRadius: 4,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  margin: 4,
                }}
                onPress={() => handleFilterChange('pageLimit', pageSize)}
              >
                <Text
                  style={{
                    color: 
                      localFilters.pageLimit === pageSize
                        ? theme.palette.primary.contrastText
                        : theme.text.primary,
                    fontSize: 14,
                  }}
                >
                  {pageSize}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Action buttons */}
      <View style={{
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: theme.divider,
        backgroundColor: theme.background.default,
      }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: theme.palette.grey[300],
            borderRadius: 4,
            paddingVertical: 10,
            alignItems: 'center',
            marginRight: 8,
          }}
          onPress={handleResetFilters}
        >
          <Text style={{
            color: theme.palette.grey[800],
            fontWeight: '600',
            fontSize: 14,
          }}>
            Reset
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            flex: 2,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 4,
            paddingVertical: 10,
            alignItems: 'center',
          }}
          onPress={applyFilters}
        >
          <Text style={{
            color: theme.palette.primary.contrastText,
            fontWeight: '600',
            fontSize: 14,
          }}>
            Apply Filters
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterPanel;