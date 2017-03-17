//
//  UIView+extend.h
//  MOS
//
//  Created by geek on 15/8/5.
//  Copyright (c) 2015年 com.cattsoft. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIView (extend)
+ (id) viewWithColor:(UIColor*) color;
//屏幕截图
- (UIImage*) snapshotViewToImage;
@end

@interface UIImage (extend)
/**
 *  @brief  缩放图片
 *
 *  @param size 目标大小
 *
 *  @return UIImage对象
 */
-(UIImage*) scaleToSize:(CGSize)size;
@end

/**
 *  @brief  键盘处理类别
 */
@interface UIView (keyboardControl)

/**
 *  @brief  点击回调
 */
typedef void(^ResignFirstResponderBlock)(void);
/**
 *  @brief  键盘变化的回调
 */
typedef void(^KeyboardWillChangeBlock)(CGRect keyboardRect, UIViewAnimationOptions options, double duration, BOOL showKeyborad);



@property (nonatomic, copy) KeyboardWillChangeBlock keyboardWillChange;
@property (nonatomic, copy) ResignFirstResponderBlock resignFirstResponderBlock;
@property (nonatomic, weak) UIView *keyboardView;

/**
 *  @brief  获得当前View响应的键盘对象
 *
 *  @return 键盘对象
 */
+ (UIView *)findKeyboard;
/**
 *  @brief  获得指定View响应的键盘对象
 *
 *  @param view 指定的View
 *
 *  @return 键盘对象
 */
+ (UIView *)findKeyboardInView:(UIView *)view;
/**
 *  @brief  添加通知事件
 *
 *  @param isPanGestured 是否添加点击事件
 */
- (void)setupPanGestureControlKeyboardHideV2:(BOOL)isPanGestured;
/**
 *  @brief  添加通知事件
 *
 *  @param isPanGestured 是否移除点击事件
 */
- (void)disSetupPanGestureControlKeyboardHideV2:(BOOL)isPanGestured;

@end