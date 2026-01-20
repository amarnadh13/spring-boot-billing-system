package in.amar.billingsoftware.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaForwardController {

    @RequestMapping({
            "/",
            "/login",
            "/dashboard",
            "/admin/**",
            "/user/**"
    })
    public String forward() {
        return "forward:/index.html";
    }
}


