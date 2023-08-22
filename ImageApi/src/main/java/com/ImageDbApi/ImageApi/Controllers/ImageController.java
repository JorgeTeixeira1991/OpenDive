package com.ImageDbApi.ImageApi.Controllers;

import com.ImageDbApi.ImageApi.Models.Image;
import com.ImageDbApi.ImageApi.Service.ImageService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/image")
public class ImageController {
  @Autowired
  private ImageService imageService;

  @PostMapping("/upload")
  public ResponseEntity<String> uploadImage(
      @RequestParam("file") MultipartFile file, @RequestParam("description") String description) {
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
  public ResponseEntity<String> getImage(@PathVariable Long id) {

    if (id == null) {
      return ResponseEntity.badRequest().build();
    }

    if (!imageService.imgExists(id)) {
      return ResponseEntity.notFound().build();
    }
    Image image = imageService.getImageById(id);

    byte[] imageData = image.getData();
    String base64Image = "[\"" + Base64.getEncoder().encodeToString(imageData) + "\"]";

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.TEXT_PLAIN);

    return new ResponseEntity<>(base64Image, headers, HttpStatus.OK);
  }

  @GetMapping()
  public ResponseEntity<List<String>> getAllImages() {
    List<Image> imageList = imageService.getAllImages();
    List<String> base64Images = new ArrayList<>();

    if (imageList == null) {
      return ResponseEntity.notFound().build();
    }

    for (Image i : imageList) {
      String base64Image = "[\"" + Base64.getEncoder().encodeToString(i.getData()) + "\"]";
      base64Images.add(base64Image);
    }

    return new ResponseEntity<>(base64Images, HttpStatus.OK);
  }

  @GetMapping("/img")
  public ResponseEntity<List<byte[]>> getAllImagesInBytes() {
    List<Image> imageList = imageService.getAllImages();
    List<byte[]> byteImages = new ArrayList<>();

    if (imageList == null) {
      return ResponseEntity.notFound().build();
    }

    for (Image i : imageList) {
      byteImages.add(i.getData());
    }

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.IMAGE_JPEG);

    return new ResponseEntity<>(byteImages, headers, HttpStatus.OK);
  }

  @GetMapping("/img/{id}")
  public ResponseEntity<byte[]> getImageInByte(@PathVariable Long id) {
    System.out.println(id);

    if (id == null) {
      return ResponseEntity.badRequest().build();
    }

    if (!imageService.imgExists(id)) {
      return ResponseEntity.notFound().build();
    }

    Image image = imageService.getImageById(id);

    if (image == null) {
      return ResponseEntity.badRequest().build();
    }

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.IMAGE_JPEG); // Adjust this based on the actual
    // image type

    return new ResponseEntity<>(image.getData(), headers, HttpStatus.OK);
  }
}
