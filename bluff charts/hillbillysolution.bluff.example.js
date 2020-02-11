<script type="text/javascript" src="../SiteAssets/jquery.min.js"></script> 

<script type="text/javascript" src="../SiteAssets/js-class.js"></script>
<script type="text/javascript" src="../SiteAssets/bluff-min.js"></script>
<script type="text/javascript" src="../SiteAssets/excanvas.js"></script>

  <canvas id="example" width="400" height="300"></canvas>


  <script type="text/javascript">
    var g = new Bluff.Line('example', '400x300');
    g.title = 'My Graph';
    g.tooltips = true;

    g.theme_37signals();

    g.data("Apples", [1, 2, 3, 4, 4, 3]);
    g.data("Oranges", [4, 8, 7, 9, 8, 9]);
    g.data("Watermelon", [2, 3, 1, 5, 6, 8]);
    g.data("Peaches", [9, 9, 10, 8, 7, 9]);

    g.labels = {0: '2003', 2: '2004', 4: '2005'};

    g.draw();
  </script>

