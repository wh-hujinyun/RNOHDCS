import React, {useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {Tester, TestSuite, TestCase} from '@rnoh/testerino';
import {AutoDragSortableView} from 'react-native-drag-sort';
import {autoDragSortableViewStyle as styles} from '../../styles';
import {generateDataSource} from '../../libs';

/**
 * 必填属性：
 * parentWidth,【父组件的宽度】
 */

const defaultData = generateDataSource(60, '标题');

export const API_parentWidth = () => {
  const [parentWidth, setParentWidth] = useState(356);
  const [childrenWidth, setChildrenWidth] = useState(88);

  return (
    <Tester>
      <TestSuite name="parentWidth">
        <TestCase
          key={'parentWidth'}
          itShould={`必填属性parentWidth 当前为${parentWidth}`}
          tags={['C_API']}
          initialState={false}
          arrange={({setState}) => {
            return (
              <View style={{height: 510}}>
                <AutoDragSortableView
                  parentWidth={parentWidth}
                  dataSource={defaultData}
                  childrenHeight={80}
                  childrenWidth={childrenWidth}
                  renderItem={item => {
                    return (
                      <View
                        key={item.id}
                        style={{
                          ...styles.childView,
                          width: childrenWidth - 4,
                          height: 76,
                        }}>
                        <Text style={styles.childText}>{item.title}</Text>
                      </View>
                    );
                  }}
                />
                <Button
                  title="修改parentWidth"
                  onPress={() => {
                    setParentWidth(320);
                    setChildrenWidth(80);
                    setState(true);
                  }}
                />
              </View>
            );
          }}
          assert={async ({expect, state}) => {
            expect(state).to.be.true;
          }}
        />
      </TestSuite>
    </Tester>
  );
};
