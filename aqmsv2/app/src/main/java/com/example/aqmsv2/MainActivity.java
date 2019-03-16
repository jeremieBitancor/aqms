package com.example.aqmsv2;

import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    TextView mHumidity, mWind, mHumidityData, mWindData, mTemp, mDesc;
    TextView mCoData, mWindSpeedData, mPowerData, mVoltsData, mCurrData;
    ImageView mIcon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mHumidityData = findViewById(R.id.humid_data);
        mWindData = findViewById(R.id.wwind_data);
        mTemp = findViewById(R.id.temp);
        mDesc = findViewById(R.id.desc);
        mHumidity = findViewById(R.id.humid_label);
        mWind = findViewById(R.id.wwind_label);
        mIcon = findViewById(R.id.icon);
        mCoData = findViewById(R.id.colevel_data);
        mWindSpeedData = findViewById(R.id.wind_data);
        mPowerData = findViewById(R.id.power_data);
        mVoltsData = findViewById(R.id.volts_data);
        mCurrData =  findViewById(R.id.amp_data);

        getWeather();
        getAqms();

        new Handler().postDelayed(new Runnable(){
            @Override
            public void run(){
            getAqms();
            }
        }, 8000);
    }

    public void getWeather(){
        String url = "https://api.openweathermap.org/data/2.5/weather?lat=9.628061&lon=123.871929&appid=50ced264cea66e978d9273222d658984&units=metric";
        final String iconURL = "http://openweathermap.org/img/w/";

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try{
                    JSONObject main_object = response.getJSONObject("main");
                    JSONObject wind_object = response.getJSONObject("wind");
                    JSONArray weather = response.getJSONArray("weather");
                    JSONObject object = weather.getJSONObject(0);
                    String temp = String.valueOf(Math.round(main_object.getDouble("temp")));
                    String desc = object.getString("description");
                    String wind = String.valueOf(Math.round(wind_object.getDouble("speed")));
                    String deg = String.valueOf(Math.round(wind_object.getDouble("deg")));
                    String humid = String.valueOf(main_object.getInt("humidity"));
                    String icon = object.getString("icon");

                    mTemp.setText(temp + (char) 0x00B0+"C");
                    mDesc.setText(desc);
                    mWindData.setText(wind +" m/s, "+ deg + (char) 0x00B0);
                    mHumidity.setText("Humidity: ");
                    mWind.setText("Wind: ");
                    mHumidityData.setText(humid + "%");
                    Picasso.get().load(iconURL+icon+".png").into(mIcon);


                }catch (JSONException e){
                    e.printStackTrace();
                }

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });
        RequestQueue queue = Volley.newRequestQueue(this);
        queue.add(request);
    }

    public void getAqms(){
        String url = "http://128.199.248.62/api/aqms/latest/";
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try{


                    String ppm = response.getString("ppm");
                    String windspeed = String.valueOf(response.getInt("windspeed"));
                    String watts = response.getString("wat_all");
                    String volts = response.getString("vol_all");
                    String amps = response.getString("amp_all");
                    mCoData.setText(ppm);
                    mWindSpeedData.setText(windspeed);
                    mPowerData.setText(watts);
                    mVoltsData.setText(volts);
                    mCurrData.setText(amps);


                }catch (JSONException e){
                    e.printStackTrace();
                }

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });
        RequestQueue queue = Volley.newRequestQueue(this);
        queue.add(request);
    }
}
