/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import <BaiduMapAPI_Base/BMKBaseComponent.h>
#import <BaiduMapAPI_Location/BMKLocationComponent.h>


@interface AppDelegate ()<BMKGeneralDelegate,BMKLocationServiceDelegate, CLLocationManagerDelegate>
{
  BMKMapManager * mapManager;
}
@property (nonatomic, strong) BMKLocationService* locService;

@end


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"ZSYXDemo"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  
  
  // 要使用百度地图，请先启动BaiduMapManager
  mapManager = [[BMKMapManager alloc]init];
  // 如果要关注网络及授权验证事件，请设定generalDelegate参数 e3mp5sSEGxnOHfSWyBC1TgHN
  BOOL ret = [mapManager start:@"NNnKNcGXtddUtXd1yA6dEKzt4P4EiMBA"  generalDelegate:self];
  if (!ret) {
    NSLog(@"manager start failed!");
  } else {
    _locService = [[BMKLocationService alloc]init];
    _locService.delegate = self;
    [_locService startUserLocationService];
  }
  return YES;
}

#pragma mark - 百度地图网络及授权验证事件
- (void)onGetNetworkState:(int)iError
{
  if (0 == iError) {
    NSLog(@"联网成功");
  }
  else{
    NSLog(@"onGetNetworkState %d",iError);
  }
  
}

- (void)onGetPermissionState:(int)iError
{
  if (0 == iError) {
    NSLog(@"授权成功");
  }
  else {
    NSLog(@"onGetPermissionState %d",iError);
  }
}
#pragma mark -百度地图定位
/**
 *在地图View将要启动定位时，会调用此函数
 *@param mapView 地图View
 */
- (void)willStartLocatingUser
{
  NSLog(@"start locate");
}

/**
 *用户方向更新后，会调用此函数
 *@param userLocation 新的用户位置
 */
- (void)didUpdateUserHeading:(BMKUserLocation *)userLocation
{
  /*
   //日志输出经纬度  需要时可以把注释打开
   NSLog(@"didUpdateUserLocation lat %f,long %f",userLocation.location.coordinate.latitude,userLocation.location.coordinate.longitude);
   NSLog(@"heading is %@",userLocation.heading);
   */
}

/**
 *用户位置更新后，会调用此函数
 *@param userLocation 新的用户位置
 */
- (void)didUpdateBMKUserLocation:(BMKUserLocation *)userLocation
{
  NSLog(@"didUpdateUserLocation lat %f,long %f",userLocation.location.coordinate.latitude,userLocation.location.coordinate.longitude);
  
  // 反地理编码 (系统)
  CLGeocoder *geocoder = [[CLGeocoder alloc] init];
  [geocoder reverseGeocodeLocation:userLocation.location completionHandler:^(NSArray *placemarks, NSError *error) {
    NSLog(@"%@", error.description);
    if (placemarks.count) {
      //获取当前城市
      CLPlacemark *mark = placemarks.firstObject;
      NSDictionary *dict = [mark addressDictionary];
      NSString *country = [dict objectForKey:@"Country"];
      NSString *localCity = [dict objectForKey:@"State"];
      NSString *formattedAddressLines = [dict objectForKey:@"FormattedAddressLines"][0];
      NSString *name = [dict objectForKey:@"Name"];
      NSMutableString *mutableStr = [NSMutableString stringWithFormat:@"%@%@",formattedAddressLines,name];
      NSRange range = [mutableStr rangeOfString:country];
      NSString *detailLocalAddress = [mutableStr substringFromIndex:range.length];
      
      // 存储当前城市名字、经纬度
      NSDictionary *locationInfo = @{
                                     @"cityName":localCity,
                                     @"latitude":[NSString stringWithFormat:@"%f",userLocation.location.coordinate.latitude],
                                     @"longitude":[NSString stringWithFormat:@"%f",userLocation.location.coordinate.longitude],
                                     @"detailLocalAddress":detailLocalAddress
                                     };
      [[NSUserDefaults standardUserDefaults]setObject:locationInfo forKey:@"locationInfo"];
      [_locService stopUserLocationService]; // 定位成功之后停止定位
    }
    
  }];
}

/**
 *在地图View停止定位后，会调用此函数
 *@param mapView 地图View
 */
- (void)didStopLocatingUser
{
  NSLog(@"stop locate");
}

/**
 *定位失败后，会调用此函数
 *@param mapView 地图View
 *@param error 错误号，参考CLError.h中定义的错误号
 */
- (void)didFailToLocateUserWithError:(NSError *)error
{
  NSLog(@"location error");
}


@end
