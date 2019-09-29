package com.example.helpaver;

import android.content.Intent;
import android.drm.DrmStore;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class mainpage extends AppCompatActivity {
Button cust,edu,house,med, other;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mainpage);
        cust = findViewById(R.id.custom);
        edu = findViewById(R.id.education);
        house = findViewById(R.id.Housing);
        med = findViewById(R.id.Medical);
        other = findViewById(R.id.more);
        cust.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent custe = new Intent(Intent.ACTION_VIEW, Uri.parse("https://nailahnolley.github.io/AggieBay/profile.html"));
                startActivity(custe);
            }
        });

        edu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent educ = new Intent(Intent.ACTION_VIEW,Uri.parse("https://nailahnolley.github.io/AggieBay/education.html"));
                startActivity(educ);
            }
        });
        house.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent home = new Intent(Intent.ACTION_VIEW,Uri.parse("https://nailahnolley.github.io/AggieBay/housing.html"));
                startActivity(home);
            }
        });
        med.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent bill = new Intent(Intent.ACTION_VIEW,Uri.parse("https://nailahnolley.github.io/AggieBay/medical.html"));
                startActivity(bill);
            }
        });
        other.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v){
                Intent last = new Intent(Intent.ACTION_VIEW,Uri.parse("https://nailahnolley.github.io/AggieBay/more.html"));
                startActivity(last);
            }
        });

    }

}
