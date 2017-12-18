## Classes

<dl>
<dt><a href="#Delegate">Delegate</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#events">events</a> ⇒ <code>Object.&lt;String, (function()|Object.&lt;String, function()&gt;)&gt;</code></dt>
<dd><p>Event listeners.</p>
</dd>
<dt><a href="#delegate">delegate</a> ⇒ <code><a href="#Delegate">Delegate</a></code></dt>
<dd><p>Direct access to Delegate.</p>
</dd>
<dt><a href="#root">root</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Root element.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#resetEvents">resetEvents()</a></dt>
<dd><p>Remove all registered listeners and attach them again.</p>
</dd>
<dt><a href="#_attachListeners">_attachListeners(listeners, [selector])</a></dt>
<dd></dd>
</dl>

<a name="Delegate"></a>

## Delegate
**Kind**: global class  
<a name="events"></a>

## events ⇒ <code>Object.&lt;String, (function()\|Object.&lt;String, function()&gt;)&gt;</code>
Event listeners.

**Kind**: global variable  
<a name="delegate"></a>

## delegate ⇒ <code>[Delegate](#Delegate)</code>
Direct access to Delegate.

**Kind**: global variable  
<a name="root"></a>

## root ⇒ <code>HTMLElement</code>
Root element.

**Kind**: global variable  
<a name="resetEvents"></a>

## resetEvents()
Remove all registered listeners and attach them again.

**Kind**: global function  
<a name="_attachListeners"></a>

## _attachListeners(listeners, [selector])
**Kind**: global function  
**Access:** protected  

| Param | Type | Default |
| --- | --- | --- |
| listeners | <code>Object.&lt;String, (function()\|Object.&lt;String, function()&gt;)&gt;</code> |  | 
| [selector] | <code>String</code> | <code></code> | 

