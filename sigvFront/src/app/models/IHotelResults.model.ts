export class IHotelResultsModel {
    AddressLine: [];
    CityName: string;
    Code: string;
    Direction: string;
    Distance: string;
    HotelSegmentCategoryCode: string;
    LBeRoomStay: [
        {
            AgeQualifyingCode: string;
            AmountAfterTax: string;
            AmountBeforeTax: string;
            BookingCode: string;
            Count: string;
            CurrencyCode: string;
            End: string;
            EndDateWindow: string;
            GuaranteeType: string;
            Name: string;
            RoomTypeCode: string;
            Start: string;
            StartDateWindow: string;
            TextDESC: string;
            availabilityStatus: string;
            effectiveDate: string;
            expireDate: string;
            rateIndicator: string;
            ratePlanCode: string;
            roomType_Value: string;
            rph: string;
            sourceOfBusiness: string;
        }
    ];
    MinPrice: string;
    PriceTotal: string;
    LHotelAmenity: [
        {
           Code: string;
           DescripcionAmenity: string;
        }
    ];
    LGuestCount: string;
    Latitude: number;
    Longitude: number;
    PostalCode: string;
    areaID: string;
    beServices: string;
    beSession: string;
    chainCode: string;
    chainName: string;
    hotelCityCode: string;
    hotelCode: string;
    hotelCodeContext: string;
    hotelName: string;
    roomStayRPH: [];
    lImagen: [
        {
        dimensionCategory: string;
        format: string;
        fileName: string;
        recordID: string;
        fileSize: string;
        height: string;
        width: string;
        url: string;
    }
    ];
    LMultimedia: [
        {
            infoCode: string;
            ODescripcion: {
                lenguaje: string;
                Value_Description: string;
            }
        }
    ];
    OHotelInfo: {
        OCategoryCodes: {
            LGuestRoomInfo: [
                {
                    Code: string;
                    Quantity: string;
                    OMultimediaDescriptions: {
                        LMultimediaDescription: [
                           {
                            OTextItems: string;
                            OImageItems: {
                                LImageItem: [
                                  {
                                    Category: string;
                                    LastModifyDateTime: string;
                                    LImageFormat: [
                                     {
                                        DimensionCategory: string;
                                        Format: string;
                                        Height: string;
                                        Width: string;
                                        RecordID: string;
                                        FileName: string;
                                        FileSize: string;
                                        IsOriginalIndicator: string;
                                        url: string;
                                     }
                                    ];
                                    LDescription: string;
                                  }
                                ];
                            }
                           }
                        ];
                    }
                }
            ]
        };
        ODescriptions: {
            OMultimediaDescriptions: {
                LMultimediaDescription: [
                    {
                        additionalDetailCode: string;
                        infoCode: string;
                        OImageItems: {
                            LImageItem: [
                                {
                                    Category: string;
                                    LastModifyDateTime: string;
                                    LImageFormat: [
                                        {
                                                dimensionCategory: string;
                                                format: string;
                                                fileName: string;
                                                recordID: string;
                                                fileSize: string;
                                                height: string;
                                                width: string;
                                                url: string;
                                                isOriginalIndicator: string;
                                        }
                                    ];
                                    LDescription: string;
                                }
                            ]
                        };
                        OTextItems: string;
                    }
                ]
            }
        }
    };
}