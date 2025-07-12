package com.example.controlPatio;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexControlPatio {
  @RequestMapping("/")
  public String index() {
    return "index";
  }
}
