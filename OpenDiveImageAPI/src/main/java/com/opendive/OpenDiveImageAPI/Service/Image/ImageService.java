package com.opendive.OpenDiveImageAPI.Service.Image;

import com.opendive.OpenDiveImageAPI.Model.Image;

public interface ImageService {

    Image getImg(Long id);

    void uploadImg(Image image);

    void deleteImg(Long id);

    void changeImg(Image imageToUpload, Long id );



}
