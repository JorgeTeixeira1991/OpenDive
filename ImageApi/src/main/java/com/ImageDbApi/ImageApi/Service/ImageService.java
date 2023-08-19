package com.ImageDbApi.ImageApi.Service;

import com.ImageDbApi.ImageApi.Models.Image;

import java.util.List;

public interface ImageService {
    Image saveImage(Image image);
    Image getImageById(Long id);
    List<Image> getAllImages() ;
    boolean imgExists(Long id);

}
