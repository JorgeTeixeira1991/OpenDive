package com.ImageDbApi.ImageApi.Controllers;

import com.ImageDbApi.ImageApi.Models.Image;
import com.ImageDbApi.ImageApi.Service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam("description") String description) {
        try {
            Image image = new Image();
            image.setData(file.getBytes());
            image.setDescription(description);
            imageService.saveImage(image);
            return ResponseEntity.ok("Image uploaded successfully!");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error uploading image: " + e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Image image = imageService.getImageById(id);

        if (image == null) {
            return ResponseEntity.notFound().build();
        }

        byte[] imageData = image.getData();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // or MediaType.IMAGE_PNG, based on the image type

        return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<String>> getAllImages() {
        List<Image> imageList = imageService.getAllImages();
        List<String> base64Images = new ArrayList<>();

        if (imageList == null) {
            return ResponseEntity.notFound().build();
        }

        for (Image i: imageList) {
            String base64Image = Base64.getEncoder().encodeToString(i.getData());
            base64Images.add(base64Image);
        }

        return new ResponseEntity<>(base64Images, HttpStatus.OK);
    }

}
