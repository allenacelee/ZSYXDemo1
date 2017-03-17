//
//  RNBridgeModule.m
//  HealthMaintenance
//
//  Created by 123456 on 16/8/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RNBridgeModule.h"

#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "AppDelegate.h"

@interface RNBridgeModule ()

// 保存图片到相册错误回调信息
@property (nonatomic,strong)NSError * error;


@end

@implementation RNBridgeModule

RCT_EXPORT_MODULE();
#pragma mark- RN传参数调用原生OC
//RN传参数调用原生OC,并且返回数据给RN  通过CallBack
RCT_EXPORT_METHOD(RNInvokeOCCallBack:(NSDictionary *)dictionary callback:(RCTResponseSenderBlock)callback){
  NSLog(@"接收到RN传过来的数据为:%@",dictionary);
  
  
  
  UIWindow *screenWindow = [[UIApplication sharedApplication] keyWindow];
  UIGraphicsBeginImageContext(screenWindow.frame.size);//screenWindow.frame.size
  [screenWindow.layer renderInContext:UIGraphicsGetCurrentContext()];
  //整张屏幕截图
  UIImage *tempImg = UIGraphicsGetImageFromCurrentImageContext();
  //指定区域截图
  //UIImage * signImage = [self getImageFromImage:tempImg];
  UIGraphicsEndImageContext();
  
  UIImageWriteToSavedPhotosAlbum(tempImg, self, @selector(image:didFinishSavingWithError:contextInfo:), (__bridge void *)self);
  
  if (!self.error) {
    NSArray *events = [[NSArray alloc] initWithObjects:@"签名截图已保存到相册",nil];
    callback(@[[NSNull null], events]);
  }else
  {
    NSLog(@"error----%@",self.error);
  }
  
  
}

- (void)image:(UIImage *)image didFinishSavingWithError:(NSError *)error contextInfo:(void *)contextInfo{
  self.error = error;
  NSLog(@"image = %@, error = %@, contextInfo = %@", image, error, contextInfo);
}


//从当前图片中截取指定大小区域并保存为新图片
-(UIImage *)getImageFromImage:(UIImage *)img{
  
  UIScreen * mainScreen = [UIScreen mainScreen];
  //定义myImageRect，截图的区域
  CGRect myImageRect = CGRectMake(0, 64, mainScreen.bounds.size.width, mainScreen.bounds.size.height-64);
  CGImageRef imageRef = img.CGImage;
  CGImageRef subImageRef = CGImageCreateWithImageInRect(imageRef, myImageRect);
  CGSize size;
  size.width = myImageRect.size.width;
  size.height = myImageRect.size.height;
  UIGraphicsBeginImageContext(size);
  CGContextRef context = UIGraphicsGetCurrentContext();
  CGContextDrawImage(context, myImageRect, subImageRef);
  UIImage* smallImage = [UIImage imageWithCGImage:subImageRef];
  UIGraphicsEndImageContext();
  return smallImage;
}



@end
