//
//  UIView+extend.m
//  MOS
//
//  Created by geek on 15/8/5.
//  Copyright (c) 2015年 com.cattsoft. All rights reserved.
//

#import "UIView+extend.h"
#import <objc/runtime.h>

@implementation UIView (extend)
+ (id) viewWithColor:(UIColor*) color
{
    UIView* rs = [[[self class] alloc] initWithFrame:CGRectZero];
    rs.backgroundColor = color;
    return rs;
}
- (UIImage*) snapshotViewToImage
{
    UIWindow *screenWindow = [[UIApplication sharedApplication] keyWindow];
    UIGraphicsBeginImageContext(screenWindow.frame.size);
    [screenWindow.layer renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *viewImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return viewImage;
}
@end

@implementation UIImage (extend)

-(UIImage*)scaleToSize:(CGSize)size
{
    // 创建一个bitmap的context
    // 并把它设置成为当前正在使用的context
    UIGraphicsBeginImageContext(size);
    
    // 绘制改变大小的图片
    [self drawInRect:CGRectMake(0, 0, size.width, size.height)];
    
    // 从当前context中创建一个改变大小后的图片
    UIImage* scaledImage = UIGraphicsGetImageFromCurrentImageContext();
    
    // 使当前的context出堆栈
    UIGraphicsEndImageContext();
    
    // 返回新的改变大小后的图片
    return scaledImage;
}
@end



static NSString * const KeyboardWillChangeBlockKey = @"KeyboardWillChangeBlockKey";
static NSString * const ResignFirstResponderBlockKey = @"ResignFirstResponderBlockKey";
static NSString * const KeyboardViewKey = @"KeyboardViewKey";

@implementation UIView (keyboardControl)

- (void)setResignFirstResponderBlock:(ResignFirstResponderBlock)resignFirstResponderBlock
{
    objc_setAssociatedObject(self, &ResignFirstResponderBlockKey, resignFirstResponderBlock, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}
- (ResignFirstResponderBlock)resignFirstResponderBlock
{
    return objc_getAssociatedObject(self, &ResignFirstResponderBlockKey);
}

- (void)setKeyboardWillChange:(KeyboardWillChangeBlock)keyboardWillChange
{
    objc_setAssociatedObject(self, &KeyboardWillChangeBlockKey, keyboardWillChange, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}
- (KeyboardWillChangeBlock)keyboardWillChange
{
    return objc_getAssociatedObject(self, &KeyboardWillChangeBlockKey);
}

- (void)setKeyboardView:(UIView *)keyboardView
{
    objc_setAssociatedObject(self, &KeyboardViewKey, keyboardView, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}
- (UIView *)keyboardView
{
    return objc_getAssociatedObject(self, &KeyboardViewKey);
}

- (void)setupPanGestureControlKeyboardHideV2:(BOOL)isPanGestured
{
    // 键盘通知
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleWillShowKeyboardNotification:)
                                                 name:UIKeyboardWillShowNotification
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleWillHideKeyboardNotification:)
                                                 name:UIKeyboardWillHideNotification
                                               object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleKeyboardWillShowHideNotification:)
                                                 name:UIKeyboardDidShowNotification
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleKeyboardWillShowHideNotification:)
                                                 name:UIKeyboardDidHideNotification
                                               object:nil];
    if (isPanGestured)
    {
        UITapGestureRecognizer * tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handlePanGesture:)];
        [self addGestureRecognizer:tap];
    }
}

- (void)disSetupPanGestureControlKeyboardHideV2:(BOOL)isPanGestured{
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIKeyboardWillShowNotification object:nil];
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIKeyboardWillHideNotification object:nil];
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIKeyboardDidShowNotification object:nil];
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIKeyboardDidHideNotification object:nil];
    
    if (isPanGestured) {
        if ([self.gestureRecognizers count]) {
            [self removeGestureRecognizer:self.gestureRecognizers[0]];
        }
    }
}

#pragma mark - Keyboard notifications

- (void)handleKeyboardWillShowHideNotification:(NSNotification *)notification {
    if([notification.name isEqualToString:UIKeyboardDidShowNotification]) {
        self.keyboardView = [UIView findKeyboard].superview;
        self.keyboardView.hidden = NO;
    }
    else if([notification.name isEqualToString:UIKeyboardDidHideNotification]) {
        self.keyboardView.hidden = NO;
        [self resignFirstResponder];
    }
}


- (void)handlePanGesture:(UITapGestureRecognizer *)pan {
    if(!self.keyboardView || self.keyboardView.hidden)
        return;
    if (self.resignFirstResponderBlock) {
        self.resignFirstResponderBlock();
    }
}

- (void)handleWillShowKeyboardNotification:(NSNotification *)notification {
    self.keyboardView.hidden = NO;
    [self keyboardWillShowHide:notification];
}

- (void)handleWillHideKeyboardNotification:(NSNotification *)notification {
    [self keyboardWillShowHide:notification];
}

- (void)keyboardWillShowHide:(NSNotification *)notification {
    CGRect keyboardRect = [[notification.userInfo objectForKey:UIKeyboardFrameEndUserInfoKey] CGRectValue];
    UIViewAnimationCurve curve = [[notification.userInfo objectForKey:UIKeyboardAnimationCurveUserInfoKey] integerValue];
    double duration = [[notification.userInfo objectForKey:UIKeyboardAnimationDurationUserInfoKey] doubleValue];
    if (self.keyboardWillChange) {
        self.keyboardWillChange(keyboardRect, [self animationOptionsForCurve:curve], duration, (([notification.name isEqualToString:UIKeyboardWillShowNotification]) ? YES : NO));
    }
}

- (UIViewAnimationOptions)animationOptionsForCurve:(UIViewAnimationCurve)curve {
    switch (curve) {
        case UIViewAnimationCurveEaseInOut:
            return UIViewAnimationOptionCurveEaseInOut;
            
        case UIViewAnimationCurveEaseIn:
            return UIViewAnimationOptionCurveEaseIn;
            
        case UIViewAnimationCurveEaseOut:
            return UIViewAnimationOptionCurveEaseOut;
            
        case UIViewAnimationCurveLinear:
            return UIViewAnimationOptionCurveLinear;
            
        default:
            return kNilOptions;
    }
}

#pragma mark - Helper Method
+ (UIView *)findKeyboard {
    UIView *keyboardView = nil;
    NSArray *windows = [[UIApplication sharedApplication] windows];
    for (UIWindow *window in [windows reverseObjectEnumerator])//逆序效率更高，因为键盘总在上方
    {
        keyboardView = [self findKeyboardInView:window];
        if (keyboardView)
        {
            return keyboardView;
        }
    }
    return nil;
}

+ (UIView *)findKeyboardInView:(UIView *)view {
    for (UIView *subView in [view subviews])
    {
        if (strstr(object_getClassName(subView), "UIKeyboard"))
        {
            return subView;
        }
        else
        {
            UIView *tempView = [self findKeyboardInView:subView];
            if (tempView)
            {
                return tempView;
            }
        }
    }
    return nil;
}

@end
